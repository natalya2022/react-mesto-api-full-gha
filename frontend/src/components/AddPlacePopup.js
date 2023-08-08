import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../hooks/useFormValidation';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isSending }) => {
  
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {    
    resetForm({}, {}, false);
  }, [ isOpen, resetForm ]);
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'place'}
      isOpen={isOpen}
      onClose={onClose}      
      onSubmit={handleSubmit}
      buttonText={isSending ? 'Сохранение...' : 'Создать'}
      isDisabled={!isValid || isSending}      
    >
      <div className="popup__fill">
        <input
          className="popup__input popup__text popup__text_position_first-line popup__text_field_place"
          type="text"
          placeholder="Название"
          id="form-place"
          name="name"
          required
          minLength={2}
          maxLength={30}
          value={values.name || ''}
          onChange={handleChange}         
        />
        <span className="form-place-error popup__error_visible">{errors.name || ""}</span>
        <input
          className="popup__input popup__text popup__text_position_second-line popup__text_field_url"
          type="url"
          placeholder="Ссылка на картинку"
          id="form-url"
          name="link"
          required               
          value={values.link || ''}
          onChange={handleChange}          
        />
        <span className="form-url-error popup__error_visible">{errors.link || ""}</span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
