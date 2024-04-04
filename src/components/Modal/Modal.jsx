import '../../styles/component/Modal/Modal.scss';
function Modal({ isOpen, size, children }) {
  return (
    <div className="wrapper">
      {isOpen && (
        <div className="modal">
          <div className={`${size === 'mini' ? 'mini' : ''}modal-content`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
