const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const recordingsList = document.getElementById('recordings-list');

stopButton.disabled = true;

const handleSuccess = function(stream) {
  const options = {
    audioBitsPerSecond : 128000,
    mimeType: 'audio/webm'
  };
  let recordedChunks = [];
  let recordingsCount = 0;
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.addEventListener('dataavailable', function(e) {
    if (e.data.size > 0) recordedChunks.push(e.data);
  });

  mediaRecorder.addEventListener('stop', function() {
    recordingsCount++;
    const recordingBlob = new Blob(recordedChunks); 
    const audioURL = URL.createObjectURL(recordingBlob);
    const fileName = `audio${recordingsCount}.wav`;

    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');
    const downloadButton = document.createElement('a');
    const deleteButton = document.createElement('button');
    const playerWrapper = document.createElement('div');

    clipContainer.classList.add('recording-wrapper');
    playerWrapper.classList.add('flex-row');
    playerWrapper.classList.add('center');

    audio.setAttribute('controls', '');
    audio.controls = true;
    audio.controlsList = "nodownload";
    audio.src = audioURL;

    clipLabel.textContent = fileName;

    downloadButton.setAttribute('href', audioURL);
    downloadButton.textContent = 'Download';
    downloadButton.id = 'delete';
    downloadButton.download = fileName;
    downloadButton.className = "button";

    deleteButton.textContent = 'Delete';
    deleteButton.id = 'delete';

    

    
    playerWrapper.appendChild(audio);
    playerWrapper.appendChild(downloadButton);
    playerWrapper.appendChild(deleteButton);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(playerWrapper);
    recordingsList.appendChild(clipContainer);

    
    recordedChunks = [];

    deleteButton.onclick = function(e) {
      let eventTarget = e.target;
      eventTarget.parentNode.parentNode.parentNode.removeChild(eventTarget.parentNode.parentNode);
    }
  });

  stopButton.addEventListener('click', function() {
    console.log('record stopping')
    mediaRecorder.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
  });

  startButton.addEventListener('click', () => {
    console.log('record starting')
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  })

};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);
