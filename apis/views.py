from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

######YOLO-v3 model requirements
from util_SDD import transparentOverlay,dst_circle,int_circle,get_bounding_box
from absl import app, logging
import matplotlib.pyplot as plt
import tensorflow as tf
from yolov3_tf2.models import (
    YoloV3
)
from yolov3_tf2.dataset import transform_images
from yolov3_tf2.utils import convert_boxes

from deep_sort import preprocessing
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.tracker import Tracker
from tools import generate_detections as gdet
from threading import Lock
from PIL import Image
import cv2
import numpy as np
import time
import math
import os
from django.core.files.storage import FileSystemStorage

###### Mask detector requirements
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
import imutils

## Firebase upload
import pyrebase
from datetime import datetime
############################################## CLOUD START ##########################################################
## Firebase account config
### Fill details according to your firebase database config for backup
config = {
	"apiKey": None,
    "authDomain": None,
    "databaseURL": None,
    "projectId": None,
    "storageBucket": None,
    "messagingSenderId": None,
    "appId": None,
    "measurementId": None,
    ### Add location of json file here in service account
    "serviceAccount": None
}

## Uncomment below 2 lines after setting up config file 
# firebase = pyrebase.initialize_app(config)
# storage = firebase.storage()

## Uncomment below function after correctly setting up config file
# def firebase_upload(img):
# 	today = datetime.now()
# 	path_cloud = str(today.date())+"/"+str(today.strftime('%Y-%m-%d %H:%M:%S'))+" "+str(img)
# 	storage.child(path_cloud).put(img)
########################################## CLOUD END ###############################################################

area = None
PROCESSING_STATUS = False
TOTAL_PEOPLE = 0
TOTAL_VIOLATORS = 0
VIOLATION_PERCENTAGE = 0
VIOLATION_FRAME = None
FILE_URL = None
SOCIAL_DIST_VIOLATION_COUNTER = 0

# Create your views here.
def index(request):
    return HttpResponse("<h1>Anti-COVIDnet</h1>")

class Camera:
    last_frame = None
    last_ready = None
    lock = Lock()

    def __init__(self, rtsp_link):
        capture = cv2.VideoCapture(rtsp_link)
        thread = threading.Thread(target=self.rtsp_cam_buffer, args=(capture,), name="rtsp_read_thread")
        thread.daemon = True
        thread.start()
    def rtsp_cam_buffer(self, capture):
        while True:
            with self.lock:
                self.last_ready, self.last_frame = capture.read()
    def getFrame(self):
        if(self.last_ready is not None) and (self.last_frame is not None):
            return self.last_frame.copy()
        else:
            return None

@csrf_exempt
def activateDetector(request):
    global FILE_URL
    if request.method == "POST":
        request_file = request.FILES.get('location')
        if request_file: 
            fs = FileSystemStorage() 
            file = fs.save(request_file.name, request_file) 
            # the fileurl variable now contains the url to the file. This can be used to serve the file when needed. 
            FILE_URL = fs.url(file) 
            print("File url now is ", FILE_URL)
            try:
                app.run(main)
                return HttpResponse("<h1>Processing Complete!</h1>")
            except SystemExit:
                pass
                return HttpResponse("<h1>Not able to process video</h1>")
    else: 
        print("No file provided! Switching to default video...")
        FILE_URL = "test.mkv" 
        try:
            app.run(main)
            return HttpResponse("<h1>Processing Complete!</h1>")
        except SystemExit:
            pass
        return HttpResponse("<h1>Not able to process video</h1>")

# def social_dist_violation_frame_handler(img):
#     global SOCIAL_DIST_VIOLATION_COUNTER
#     SOCIAL_DIST_VIOLATION_COUNTER = (SOCIAL_DIST_VIOLATION_COUNTER + 1)%20
#     if SOCIAL_DIST_VIOLATION_COUNTER == 19:
#         cv2.imwrite("temp.png",img)
#         firebase_upload("temp.png")
#         os.remove("temp.png")

def main(argv):
    # print("location recieved in main as: ", e)
    ###################################
    global VIOLATION_PERCENTAGE, PROCESSING_STATUS, VIOLATION_FRAME
    violator_count_list = list()
    ###################################
    # Definition of the parameters
    max_cosine_distance = 0.5
    nn_budget = None
    nms_max_overlap = 1.0
    
    #initialize deep sort
    model_filename = 'model_data/mars-small128.pb'
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)

    physical_devices = tf.config.experimental.list_physical_devices('GPU')
    if len(physical_devices) > 0:
        tf.config.experimental.set_memory_growth(physical_devices[0], True)

    yolo = YoloV3(classes=80)

    yolo.load_weights('./weights/yolov3.tf')
    logging.info('weights loaded')

    class_names = [c.strip() for c in open('./coco.names').readlines()]
    logging.info('classes loaded')
    video_path='test.mkv'
    

    try:
        vid = cv2.VideoCapture(int(FILE_URL))
    except:
        vid = cv2.VideoCapture(FILE_URL)
    time.sleep(1.0)


    out = None

    # if FLAGS.output:
        # by default VideoCapture returns float instead of int
    width = int(vid.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print("height: ",height)
    print("width: ", width)
    fps = int(vid.get(cv2.CAP_PROP_FPS))
    codec = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('./result.avi', codec, fps, (width, height))
    frame_index = -1 
    fps = 0.0
    count = 0 
    PROCESSING_STATUS = True
    while True:
        _, img = vid.read()
        if img is None:
            logging.warning("Empty Frame")
            time.sleep(0.1)
            count+=1
            if count < 3:
                continue
            else: 
                break
        # VIOLATION_FRAME = img
        # img = imutils.resize(img, width=450)
        # cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # np.dstack([img, img, img])
        img2 = img.copy()
        img_in = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) 
        img_in = tf.expand_dims(img_in, 0)
        img_in = transform_images(img_in, 416)
        temp_violators = set()
        temp_total_people = set()
        t1 = time.time()
        boxes, scores, classes, nums = yolo.predict(img_in)
        classes = classes[0]
        names = []
        for i in range(len(classes)):
            names.append(class_names[int(classes[i])])
        names = np.array(names)
        converted_boxes = convert_boxes(img, boxes[0])
        features = encoder(img, converted_boxes)    
        detections = [Detection(bbox, score, class_name, feature) for bbox, score, class_name, feature in zip(converted_boxes, scores[0], names, features)]
        
        #initialize color map
        cmap = plt.get_cmap('tab20b')
        colors = [cmap(i)[:3] for i in np.linspace(0, 1, 20)]

        # run non-maxima suppresion
        boxs = np.array([d.tlwh for d in detections])
        scores = np.array([d.confidence for d in detections])
        classes = np.array([d.class_name for d in detections])
        indices = preprocessing.non_max_suppression(boxs, classes, nms_max_overlap, scores)
        detections = [detections[i] for i in indices]        

        # Call the tracker
        tracker.predict()
        tracker.update(detections)
        for track in tracker.tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue
            class_name1 = track.get_class()
            if class_name1=="person":
                temp_total_people.add(track.track_id)
                bbox1 = track.to_tlbr()
                x1_c = int(bbox1[0]+(bbox1[2]-bbox1[0])/2)
                y1_c = int(bbox1[1]+(bbox1[3]-bbox1[1])/2)
                r1 = int(abs(bbox1[3]-bbox1[1]))
                color = (255,0,0)
                cv2.line(img, (x1_c, y1_c), (x1_c, y1_c + r1 // 2), (0, 255, 0), 2)
                cv2.circle(img, (x1_c, y1_c), 5, (255, 20, 200), -1)
                scale = (r1)/100
                transparentOverlay(img, dst_circle, (x1_c, y1_c - 5), alphaVal=110, color=(0,200,20), scale=scale)
                for other in tracker.tracks:
                    if not other.is_confirmed() or other.time_since_update > 1:
                        continue
                    if track.track_id == other.track_id:
                        continue
                    
                    class_name2 = other.get_class()
                    if class_name2=="person":
                        temp_total_people.add(other.track_id)
                        bbox2 = other.to_tlbr()
                        x2_c = int(bbox2[0]+(bbox2[2]-bbox2[0])/2)
                        y2_c = int(bbox2[1]+(bbox2[3]-bbox2[1])/2)
                        r2 = int(abs(bbox2[3]-bbox2[1]))
                        if int_circle(x1_c, y1_c, x2_c, y2_c, r1 // 2, r2 // 2) >= 0 and abs(y1_c - y2_c) < r1 // 4:
                            temp_violators.add(track.track_id)
                            temp_violators.add(other.track_id)
                            cv2.line(img, (x1_c, y1_c), (x2_c, y2_c), (0, 0, 255), 2)
                            scale1 = (r1)/100
                            transparentOverlay(img, dst_circle, (x1_c, y1_c - 5), alphaVal=110, color=(0,0,255), scale=scale1)
                            scale2 = (r2)/100
                            transparentOverlay(img, dst_circle, (x2_c, y2_c - 5), alphaVal=110, color=(0,0,255), scale=scale2)
        
        # print fps on screen 
        ### Comment below 3 lines to not see live output screen
        fps  = ( fps + (1./(time.time()-t1)) ) / 2
        cv2.putText(img, "FPS: {:.2f}".format(fps), (0, 30),
                          cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 0, 255), 2)
        cv2.imshow('output', img)

        ### Violators calculation
        violators_for_frame = len(temp_violators)
        VIOLATION_PERCENTAGE = violators_for_frame
        print("Violation percentage: ", violators_for_frame)
        violator_count_list.append(int(violators_for_frame))
        ###
        ### Call to firebase upload function
        # if violators_for_frame > 20:
        #     social_dist_violation_frame_handler(img)
        #     cv2.imwrite("temp.png",img)
        #     firebase_upload("temp.png")
        #     os.remove("temp.png")
        
        frame_index = frame_index + 1

        # press q to quit
        if cv2.waitKey(1) == ord('q'):
            break
    vid.release()
    if len(violator_count_list) == 0:
        mean_violation = 0
    else:
        mean_violation = sum(violator_count_list)/len(violator_count_list)
    PROCESSING_STATUS = False
    out.release()
    cv2.destroyAllWindows()
    ### Uncomment below line if you want to automatically delete raw video received from frontend after processing
    # os.remove(FILE_URL)

@csrf_exempt
def getViolationPercentage(request):
    global PROCESSING_STATUS, VIOLATION_PERCENTAGE
    if PROCESSING_STATUS:
        return HttpResponse(VIOLATION_PERCENTAGE, content_type="text/plain")
    else:
        return HttpResponse("No processing detected")

######################################## MASK DETECTION ############################################################

def detect_and_predict_mask(frame, faceNet, maskNet):
	# grab the dimensions of the frame and then construct a blob
	# from it
	(h, w) = frame.shape[:2]
	blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300),
		(104.0, 177.0, 123.0))

	# pass the blob through the network and obtain the face detections
	faceNet.setInput(blob)
	detections = faceNet.forward()

	# initialize our list of faces, their corresponding locations,
	# and the list of predictions from our face mask network
	faces = []
	locs = []
	preds = []

	# loop over the detections
	for i in range(0, detections.shape[2]):
		# extract the confidence (i.e., probability) associated with
		# the detection
		confidence = detections[0, 0, i, 2]

		# filter out weak detections by ensuring the confidence is
		# greater than the minimum confidence
		if confidence > 0.5:
			# compute the (x, y)-coordinates of the bounding box for
			# the object
			box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
			(startX, startY, endX, endY) = box.astype("int")

			# ensure the bounding boxes fall within the dimensions of
			# the frame
			(startX, startY) = (max(0, startX), max(0, startY))
			(endX, endY) = (min(w - 1, endX), min(h - 1, endY))

			# extract the face ROI, convert it from BGR to RGB channel
			# ordering, resize it to 224x224, and preprocess it
			face = frame[startY:endY, startX:endX]
			face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
			face = cv2.resize(face, (224, 224))
			face = img_to_array(face)
			face = preprocess_input(face)

			# add the face and bounding boxes to their respective
			# lists
			faces.append(face)
			locs.append((startX, startY, endX, endY))

	# only make a predictions if at least one face was detected
	if len(faces) > 0:
		# for faster inference we'll make batch predictions on *all*
		# faces at the same time rather than one-by-one predictions
		# in the above `for` loop
		faces = np.array(faces, dtype="float32")
		preds = maskNet.predict(faces, batch_size=32)

	# return a 2-tuple of the face locations and their corresponding
	# locations
	return (locs, preds)

def mask_detector():
    # load our serialized face detector model from disk
    print("[INFO] loading face detector model...")
    prototxtPath = os.path.sep.join(['face_detector', "deploy.prototxt"])
    weightsPath = os.path.sep.join(['face_detector',
        "res10_300x300_ssd_iter_140000.caffemodel"])
    faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

    # load the face mask detector model from disk
    print("[INFO] loading face mask detector model...")
    maskNet = load_model("mask_detector.model")

    print("[INFO] starting video stream...")
    vs = VideoStream(src=0).start()
    time.sleep(2.0)

    # loop over the frames from the video stream
    while True:
        # grab the frame from the threaded video stream and resize it
        # to have a maximum width of 400 pixels
        frame = vs.read()
        frame = imutils.resize(frame, width=400)

        # detect faces in the frame and determine if they are wearing a
        # face mask or not
        (locs, preds) = detect_and_predict_mask(frame, faceNet, maskNet)

        # loop over the detected face locations and their corresponding
        # locations
        for (box, pred) in zip(locs, preds):
            # unpack the bounding box and predictions
            (startX, startY, endX, endY) = box
            (mask, withoutMask) = pred

            # determine the class label and color we'll use to draw
            # the bounding box and text
            label = "Mask" if mask > withoutMask else "No Mask"
            color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

            # include the probability in the label
            label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

            # display the label and bounding box rectangle on the output
            # frame
            cv2.putText(frame, label, (startX, startY - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
            cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

        # show the output frame
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

    # do a bit of cleanup
    cv2.destroyAllWindows()
    vs.stop()


def activateMask(request):
    mask_detector()
    return HttpResponse("<h1>Started mask detector</h1>")