import '../styles/post/ImageModal.scss'

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="ImageModal_Backdrop" onClick={onClose}>
      <div className="ImageModal_Content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Detailed view" className="ImageModal_Image" />
        <button className="ImageModal_CloseButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
