import './AudioPlayer.styles.css';

const AudioPlayer = ({ src, fileName, handleDelete }) => {

  const DownloadButton = () => <a href={src} id="download" className="button" download={fileName}>Download</a>;
  
  const DeleteButton = () => {
    return (
      <button id="delete" onClick={handleDelete}>Delete</button>
    )
  }
  return (
    <div className='recording-wrapper'>
      <p>{fileName}</p>
      <div className="flex-row center">
        <audio controls controlsList="nodownload" src={src} />
        <DownloadButton />
        <DeleteButton />
      </div>
    </div>
  );
}

export default AudioPlayer;
