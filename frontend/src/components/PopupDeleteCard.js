import React from 'react';

const PopupDeleteCard = ({    
  isOpen,
  onClose,
  onSubmit,
  isSending,
  ...props
}) => {

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
    <div className={`popup popup_type_place ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>        
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
        <form className="popup__edit" name="delete" onSubmit={onSubmit}>
          <h2 className="popup__tooltip">Вы уверены?</h2>
          <button className={`popup__save popup__save_style ${isSending ? 'popup__save_disabled' : ''}`} type="submit" disabled={isSending} >{isSending ? 'Удаление...' : 'Да'}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupDeleteCard;
