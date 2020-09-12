# Anti-COVIDnet : The One-Step Solution to make your premises safe again!
Anti-COVIDnet is a full proof end to end system that is capable of monitoring real-time CCTV camera feeds in the concerned area. It is capable of accurately detecting the safe distance between two people with the help of proper calibration by our algorithms and constantly checking if the Social Distancing norms are being followed properly or not. 

Anti-COVIDnet is capable of keeping track of multiple CCTV cameras at once and provides Cloud support for the social distancing violation images.
Apart from that it also provides a Mask Detector and support for temperature detection through thermal cameras. This feature is integrated with the main system and together it can accurately detect a possible infected person and the violation percentage around him/her. The information of all the violations, wrt time and location, gets displayed on the website with authenticated access.

Now one of the most prominent features of Anti-COVIDnet is preventing such violations from occurring in the first place. Our system keeps track of how many violations occur at various places and then accurately analyses which areas could prove to be risky zones in the offices/colleges and then alerts the gathered crowd in that area instantly to disperse and follow the social distancing norms. 
All these features combined make the offices/colleges/malls which have not yet opened a safer place instantly.


## Setting up Anti-COVIDnet
### STEP 1: Create a Virtual env to contain all your packages safe
```bash
conda env create -f conda-gpu.yml
conda activate tracker-gpu
```

### STEP 2: Install all the requirements
```bash
pip install -r requirements.txt
```

### STEP 3: Set up Nvidia Driver for GPU (only if you have not set it up already)
```bash
# Ubuntu 18.04
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt install nvidia-driver-430
# Windows/Other
https://www.nvidia.com/Download/index.aspx
```

### STEP 4: Download offical Yolov3 weights
For Linux: Let's download official yolov3 weights pretrained on COCO dataset. 

```
# yolov3
wget https://pjreddie.com/media/files/yolov3.weights -O weights/yolov3.weights
```
For Windows:
You can download the yolov3 weights by clicking [here](https://pjreddie.com/media/files/yolov3.weights) then save it to the weights folder.

### STEP 5: Run load_weights.py
```
python load_weights.py
```

### STEP 6: Install node modul
```
cd anti-covidnet-react
npm install
cd ..
```

### STEP 7: Activate Anti-COVIDnet Scripts
```
# Backend
python manage.py runserver
# Frontend 
cd anti-covidnet-react
npm start
```
