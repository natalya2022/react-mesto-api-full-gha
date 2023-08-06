import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../hooks/useFormValidation';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();    
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid} 
    >
      <div className="popup__fill">
        <input
          className={`popup__input popup__text popup__text_position_first-line popup__text_field_name ${!isValid && "popup__input_type_error"}`}
          type="text"
          placeholder="Имя"
          id="form-name"
          name="name"
          required
          minLength={2}
          maxLength={40}
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="form-name-error popup__error_visible">{errors.name || ""}</span>
        <input
          className={`popup__input popup__text popup__text_position_second-line popup__text_field_occupation ${!isValid && "popup__input_type_error"}`}
          type="text"
          placeholder="Занятие"
          id="form-job"
          name="about"
          required
          minLength={2}
          maxLength={200}                  
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className="form-job-error popup__error_visible">{errors.about || ""}</span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
