import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const userAvatarRef = useRef();

  useEffect(() => {
    userAvatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: userAvatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__fill">
        <input
          className="popup__input popup__text popup__text_position_second-line popup__text_field_url"
          type="url"
          placeholder="Ссылка на аватар"
          id="form-avatar"
          name="avatar"
          required
          ref={userAvatarRef}
        />
        <span className="form-avatar-error" />
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
