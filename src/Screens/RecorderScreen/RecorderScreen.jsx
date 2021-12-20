import AudioPlayer from 'Components/AudioPlayer/AudioPlayer';
import RecordButton from 'Components/RecordButton';
import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react/cjs/react.development';
import { getRecordings, uploadRecording } from 'serverClient';
import './RecorderScreen.styles.css';

let mediaRecorder;

const RecorderScreen = () => {
  const [recordingsList, setRecordingsList] = useState([]);
  const [recordingCount, setRecordingCount] = useState(1);

  useEffect(() => {
    const handleSuccess = (stream) => {
      let recordedChunks = [];
      
      const options = {
        audioBitsPerSecond : 128000,
        mimeType: 'audio/webm'
      };
      
      mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      mediaRecorder.addEventListener('stop', async () => {
        const recordingBlob = new Blob(recordedChunks); 
        const audioURL = URL.createObjectURL(recordingBlob);
        const fileName = `audio${recordingCount}.wav`;

        // const res = await getRecordings();
        await uploadRecording({ fileName, recordingBlob });

        setRecordingsList([...recordingsList, { audioURL, fileName }])
        setRecordingCount(recordingCount + 1);
        recordedChunks = [];
      });
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
      .catch(err => console.log('error grabbing usermedia'));

  }, [recordingCount, recordingsList])

  const Header = () => (
    <header className="header">
      Record audio
    </header>
  );

  const Description = () => `Press the button below to record! Press again to finish recording.`;

  return (
    <div className="recorder-screen">

      <Header />
      <Description />
      
      <RecordButton
        startRecording={() => mediaRecorder.start()}
        stopRecording={() => mediaRecorder.stop()}
      />

      {
        recordingsList.map(({ audioURL, fileName }, index) => {
          const handleDelete = () => {
            setRecordingsList([...recordingsList.slice(0, index), ...recordingsList.slice(index + 1)])
          };

          return (
            <AudioPlayer src={audioURL} fileName={fileName} key={index} handleDelete={handleDelete} />
          )
        })
      }

    </div>
  );
}

export default RecorderScreen;
