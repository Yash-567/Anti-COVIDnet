<div class="tab-pane fade show active py-4 markdown-style" id="home" role="tabpanel" aria-labelledby="home-tab">
  <h1 align="center">Anti-COVIDnet</h1>
  <h1 align="center">The One-Step Solution to make your premises safe again!</h1>
  
<p>Doing what we can, with what we have, where we are!</p>


<p>Anti-COVIDnet is a full proof end to end system that is capable of monitoring real-time CCTV camera feeds in the concerned area. It is capable of accurately detecting the safe distance between two people with the help of proper calibration by our algorithms and constantly checking if the Social Distancing norms are being followed properly or not.</p>

<p>Anti-COVIDnet is capable of keeping track of multiple CCTV cameras at once and provides Cloud support for the social distancing violation images.<br
>Apart from that it also provides a Mask Detector and support for temperature detection through thermal cameras. This feature is integrated with the main system and together it can accurately detect a possible infected person and the violation percentage around him/her. The information of all the violations, wrt time and location, gets displayed on the website with authenticated access.
</p>

<hr/>

<h2 id="how-does-it-work">How Does it Work?</h2>

<ol>
<li>
  <h5><strong>Social Distancing Analyzer</strong></h5>
  <p>In this step, social distancing detection logic is applied to any video source and the frames that record violations are extracted in real time which are instantly uploaded to the cloud storage. These images are displayed on the dashboard. The system gives instructions over to the IoT device to instruct people violating norms.</p>
  <img src="https://github.com/Yash-567/Anti-COVIDnet/blob/master/Images/Social-distancing.png" width="800" height="600">
  </li>
<li>
  <h5><strong>Face mask detection</strong></h5>
  <p>This module detects whether a person is wearing a mask or not. The feed input to the system is analysed for people not wearing face mask. The violated frames are uploaded to the cloud storage which can later accessed whenever required. The system gives instructions over to the IoT device to instruct people violating norms.</p>
  <img src="https://github.com/Yash-567/Anti-COVIDnet/blob/master/Images/face_mask.png" width="600" height="400"> 
  </li>
<li>
  <h5><strong>Thermal Screening</strong></h5>
  <p>Thermal screening module uses a thermal scanning camera that processes the input stream to identify people having temperature greater than a threshold value. Depending on the requirement of the location, automatic instructions can be delivered using IoT devices.</p>
  </li>
  <img src="https://github.com/Yash-567/Anti-COVIDnet/blob/master/Images/thermal.jpg" width="500" height="600">
</ol>

<p>Now one of the most prominent features of Anti-COVIDnet is preventing such violations from occurring in the first place. Our system keeps track of how many violations occur at various places and then accurately analyses which areas could prove to be risky zones in the offices/colleges and then alerts the gathered crowd in that area instantly to disperse and follow the social distancing norms.</p>

<p>All these features combined make the offices/colleges/malls which have not yet opened a safer place instantly.</p>

<p></p>


<p><details></p>

<ul>
<li><a href="#Features">Features</a></li>
<li><a href="#Demo">Demo</a></li>
<li><a href="#built-with">Built with</a></li>
<li><a href="#Installation">Installation</a></li>
<li><a href="#Authors">Authors</a></li>
<li><a href="#Support">Support</a></li>
<li><a href="#Contributing">Contributing</a></li>
<li><a href="#License">License</a></li>
</ul>

<p></details></p>



<h2 id="features">Features</h2>


<h5 id=""><strong>Real-time</strong></h5>

<p>The system is entirely real-time with neglible latency</p>


<h5 id=""><strong>IoT integration to automate the system</strong></h5>

<p>IoT devices can be used to deliver automatic instructions over speakers</p>


<h5 id=""><strong>Cloud support</strong></h5>

<p>Firebase storage and firestore is used to store data for better management and remote access</p>


<h5 id=""><strong>Privacy centered</strong></h5>

<p>No personally identifiable information is either stored or used without user's consent</p>


<h5 id=""><strong>Algorithmic Efficiency</strong></h5>

<p>The application stands out in comparison with other similar applications</p>



<h2 id="demo">Demo</h2>

<p><a href=""></a></p>


<h2 id="built-with">Built with</h2>

<ul>
<li>Python</li>
<li>Django</li>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>React JS</li>
<li>Firebase</li>
</ul>

<code><img src="https://img.icons8.com/color/65/000000/python.png"/></code>
<code><img src="https://img.icons8.com/color/80/000000/django.png"/></code>
<code><img src="https://img.icons8.com/color/65/000000/html-5.png"/></code>
<code><img src="https://img.icons8.com/color/65/000000/css3.png"/></code>
<code><img src="https://img.icons8.com/color/65/000000/javascript.png"/></code><br/>
<code><img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-ar21.svg"></code>
<code><img width="150" height="75" src="https://i.ytimg.com/vi/fgT6r4f9Apc/maxresdefault.jpg"></code>



<h2 id="installation">Installation</h2>

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
### STEP 6: Initialising the Dashboard
```
cd ./Anti-COVIDnet-Dashboard
npm install
npm start

```
The dashboard can be checked out on "http://localhost:3000" once the development server starts.

### STEP 7: Activate Anti-COVIDnet Scripts
```
# Server
python manage.py runserver
```



<h2 id="authors">Authors</h2>

<ul>
<li><a href="https://github.com/Yash-567/Anti-COVIDnet/graphs/contributors">View all contributors</a></li>
</ul>



<h2 id="support">Support</h2>

<p>Please <a href="https://github.com/Yash-567/Anti-COVIDnet/issues/new">open an issue</a> for support.</p>



<h2 id="contributing">Contributing</h2>

<p>Please contribute using <a href="https://guides.github.com/introduction/flow">GitHub Flow</a>. Create a branch, add commits, and open a pull request</a>.</p>


<h2 id="license">License</h2>

<p>This project is licensed under the <a href="https://opensource.org/licenses/GPL-3.0">GPL-3 License</a> - see the <a href="https://github.com/Yash-567/Anti-COVIDnet/blob/master/LICENSE"><code>LICENSE</code></a> file for details.</p>

<p>Let us know your thoughts, we're open for ideas!</p>

<p>Feel free to <a href="https://github.com/Yash-567/Anti-COVIDnet/issues">add / contribute features</a>.</p>

<p>If you're interested in this project, feel free to drop us an email on <a href="mailto:yashsonar213@gmail.com?subject=FOSS United Hackathon Anti-COVIDnet &lt;&gt; Project ebb&amp;body=I'm interested in your project Anti-COVIDnet.">yashsonar213@gmail.com</a> or on <a href="https://t.me/yashsonar213">Telegram</a></p>



<p align="center">
  <br>
  <img src="https://www.asianscientist.com/wp-content/uploads/2020/04/KO_COVID.gif" width="300">
</p>

<p align="center">
  <b>It's time to re-open,<br>Because we have had enough!</b>
</p>

</div>

