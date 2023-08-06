import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../hooks/useFormValidation';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const userAvatarRef = useRef();
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => { 
    if (userAvatarRef) {   
      resetForm(userAvatarRef, {}, false);
    }
  }, [ isOpen, resetForm, userAvatarRef ]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({      
      avatar: values.avatar
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
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
          value={values.avatar || ''}
          onChange={handleChange}
        />
        <span className="form-avatar-error popup__error_visible">{errors.avatar || ""}</span>        
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
