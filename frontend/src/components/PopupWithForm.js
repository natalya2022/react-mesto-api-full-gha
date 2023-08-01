import React from 'react';

const PopupWithForm = ({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  ...props
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
        <form className="popup__edit" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save popup__save_style" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
