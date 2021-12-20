import { useState } from 'react';
import './RecordButton.styles.css';

const RecordButton = ({ startRecording, stopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleOnClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
    setIsRecording(!isRecording)
  };

  return (
    <div className={isRecording ? "record-button-recording" : "record-button"} onClick={handleOnClick}>
      <div className={isRecording ? "center-button-recording" : 'center-button'}/>
    </div>
  );
}

export default RecordButton;
