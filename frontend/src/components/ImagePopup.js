import React from 'react';

const ImagePopup = ({ name, link, isOpen, onClose }) => {

  React.useEffect(() => {
    if(!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__image-container" onClick={(e) => e.stopPropagation()}>
        <img src={link} alt={name} className="popup__photo" />
        <p className="popup__place-name">{name}</p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
