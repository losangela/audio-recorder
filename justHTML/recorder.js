const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');
const soundClips = document.getElementById('sound-clips');
const startButton = document.getElementById('start');
const player = document.getElementById('player');

stopButton.disabled = true;

const handleSuccess = function(stream) {
  const options = {
    audioBitsPerSecond : 128000,
    mimeType: 'audio/webm'
  };
  let recordedChunks = [];
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.addEventListener('dataavailable', function(e) {
    if (e.data.size > 0) recordedChunks.push(e.data);
  });

  mediaRecorder.addEventListener('stop', function() {
    downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
    player.src = downloadLink.href;
    downloadLink.download = 'acetest.wav';
    // const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

    // const clipContainer = document.createElement('article');
    // const clipLabel = document.createElement('p');
    // const audio = document.createElement('audio');
    // const deleteButton = document.createElement('button');

    // clipContainer.classList.add('clip');
    // audio.setAttribute('controls', '');
    // deleteButton.textContent = 'Delete';
    // deleteButton.className = 'delete';

    // if(clipName === null) {
    //   clipLabel.textContent = 'My unnamed clip';
    // } else {
    //   clipLabel.textContent = clipName;
    // }

    // clipContainer.appendChild(audio);
    // clipContainer.appendChild(clipLabel);
    // clipContainer.appendChild(deleteButton);
    // soundClips.appendChild(clipContainer);

    // audio.controls = true;
    // const blob = new Blob(recordedChunks, { 'type' : 'audio/ogg; codecs=opus' });
    // recordedChunks = [];
    // const audioURL = window.URL.createObjectURL(blob);
    // audio.src = audioURL;
    // console.log("recorder stopped");
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
