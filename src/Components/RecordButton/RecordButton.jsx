import { useEffect, useState } from 'react';
import './RecordButton.styles.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let recorder;
const recordings = [];
// const recordingDevice = navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     recorder = new MediaRecorder(stream);
//     recorder.ondataavailable = e => recordings.push(e.data)
//   })
//   .catch(err => console.log(err))

const RecordButton = () => {
  const [audio, setAudio] = useState();
  const [isRecording, setIsRecording] = useState(false);

  
  useEffect(() => {
    if (isRecording) {
      // recorder.start();
    } else {
      // recorder.stop();
    }
  }, [isRecording]);

  const handleOnClick = () => {
    setIsRecording(!isRecording)
  };

  return (
    <div className={isRecording ? "record-button-recording" : "record-button"} onClick={handleOnClick}>
      <div className={isRecording ? "center-button-recording" : 'center-button'}/>
      
    </div>
  );
}

export default RecordButton;
