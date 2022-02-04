
const video = document.getElementById("webcam-video");
const enableWebcamBtn = document.getElementById("enable-webcam-btn");
const selectWebcam = document.getElementById("webcam-select");
const videoBox = document.getElementById("video-container");
var currentStream = undefined;
var webcamConstraints = { deviceId: 0};
var model = undefined;
var children = [];

function enableWebcam(event) {
    // Hide the button once clicked.
    //event.target.classList.add('removed');  

    var constraints = {
        video: {
            deviceId: webcamConstraints.deviceId
        }
    };
  
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        currentStream = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

function getWebcamDevices(mediaDevices) {
    selectWebcam.innerHTML = '';
    selectWebcam.appendChild(document.createElement('option'));
    let count = 1;

    mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = mediaDevice.deviceId;
        const label = mediaDevice.label || `Camera ${count++}`;
        const textNode = document.createTextNode(label);
        option.appendChild(textNode);
        selectWebcam.appendChild(option);
        }
    });
}

$(document).ready(function() {
    //navigator.mediaDevices.enumerateDevices().then(getWebcamDevices);
    $.get("http://localhost:3500/scanner/index", function(data) {
        console.log(typeof data);
        console.log(data);
        model = data;
    });
});

$("#enable-webcam-btn").click(function() {
    console.log("Pressed webcam.");

    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        if (enableWebcamBtn) {
            enableWebcamBtn.addEventListener('click', enableWebcam);
        }
    } else {
        console.warn('getUserMedia() is not supported by your browser');
    }
    navigator.mediaDevices.enumerateDevices().then(getWebcamDevices);
});

function changeWebcamDevice() {
    if (!model) {
        return;
    }
    if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
    }
    console.log("Changed to webcam " + selectWebcam.value);
    webcamConstraints.deviceId = selectWebcam.value;
    enableWebcam();
}

// import * as tf from './tensorflow/tfjs';
// import {loadGraphModel} from './tensorflow/tfjs-converter';
// model = await loadGraphModel("./trasd_model_js.json");

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
// cocoSsd.load().then(function (loadedModel) {
//   model = loadedModel;
//   // Show demo section now model is ready to use.
//   //demosSection.classList.remove('invisible');
// });

function stopMediaTracks(stream) {
    console.log("Stopping current stream");
    stream.getTracks().forEach(track => {
      track.stop();
    });
}

function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.then(function (res) {

        let predictions = res.predict(video);

      // Remove any highlighting we did previous frame.
      for (let i = 0; i < children.length; i++) {
        videoBox.removeChild(children[i]);
      }
      children.splice(0);
      
      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        // If we are over 66% sure we are sure we classified it right, draw it!
        if (predictions[n].score > 0.66) {
          const p = document.createElement('p');
          p.innerText = predictions[n].class  + ' - with ' 
              + Math.round(parseFloat(predictions[n].score) * 100) 
              + '% confidence.';
          p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
              + (predictions[n].bbox[1] - 10) + 'px; width: ' 
              + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
  
          const highlighter = document.createElement('div');
          highlighter.setAttribute('class', 'highlighter');
          highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
              + predictions[n].bbox[1] + 'px; width: ' 
              + predictions[n].bbox[2] + 'px; height: '
              + predictions[n].bbox[3] + 'px;';
  
          videoBox.appendChild(highlighter);
          videoBox.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
      }
      
      // Call this function again to keep predicting when the browser is ready.
      window.requestAnimationFrame(predictWebcam);
    });
}