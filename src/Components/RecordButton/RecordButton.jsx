import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './RecordButton.styles.css';

let timeout;

const RecordButton = ({ startRecording, stopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    // Handles ticking timer of record button
    if (isRecording && secondsLeft > 0) {
      timeout = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }

    if (isRecording && secondsLeft === 0) {
      stopRecording();
      setSecondsLeft(30);
      setIsRecording(false);
    }
  }, [isRecording, secondsLeft, stopRecording]);

  const handleOnClick = () => {
    if (isRecording) {
      stopRecording();
      clearTimeout(timeout);
      setSecondsLeft(30);
    } else {
      startRecording();
    };
    setIsRecording(!isRecording);
  };

  return (
    <div className={isRecording ? "record-button-recording" : "record-button"} onClick={handleOnClick}>
      <div className={isRecording ? "center-button-recording" : 'center-button'}>
        <div className="centered-number">
          {secondsLeft}
        </div>
      </div>
    </div>
  );
}

export default RecordButton;
