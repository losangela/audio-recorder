import AudioPlayer from 'Components/AudioPlayer/AudioPlayer';
import RecordButton from 'Components/RecordButton';
import { useState } from 'react/cjs/react.development';
import './RecorderScreen.styles.css';

const RecorderScreen = () => {
  const [capturedAudio, setCapturedAudio] = useState();

  return (
    <div className="recorder-screen">
      <header className="header">
        Record audio
      </header>
      Press the button below to record! Press again to finish recording.
      <p />
      <RecordButton />

      <p />

      Recorded audio:
      <AudioPlayer />

    </div>
  );
}

export default RecorderScreen;
