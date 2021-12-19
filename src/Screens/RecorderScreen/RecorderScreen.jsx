import RecordButton from 'Components/RecordButton';
import './RecorderScreen.styles.css';

const RecorderScreen = () => {
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
      
    </div>
  );
}

export default RecorderScreen;
