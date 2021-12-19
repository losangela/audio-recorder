import { useEffect, useState } from 'react';
import './AudioPlayer.styles.css';

const AudioPlayer = () => {
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  
  useEffect(() => {
    if (isPlaying) {
      // recorder.start();
    } else {
      // recorder.stop();
    }
  }, [isPlaying]);

  const handlePlayOnClick = () => {
    setIsPlaying(!isPlaying)
  };

  return (
    <div className="audio-player">
      <div className="play-button" onClick={handlePlayOnClick}>
        {isPlaying ? '□' : '▷'}
      </div>
      <div className='audio-buffer-bar' />
    </div>
  );
}

export default AudioPlayer;
