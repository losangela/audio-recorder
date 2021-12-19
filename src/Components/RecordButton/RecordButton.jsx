import { useState } from 'react';
import './RecordButton.styles.css';

const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);

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
