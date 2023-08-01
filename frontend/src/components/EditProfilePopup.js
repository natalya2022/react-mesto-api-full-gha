import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__fill">
        <input
          className="popup__input popup__text popup__text_position_first-line popup__text_field_name"
          type="text"
          placeholder="Имя"
          id="form-name"
          name="name"
          required
          minLength={2}
          maxLength={40}
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="form-name-error" />
        <input
          className="popup__input popup__text popup__text_position_second-line popup__text_field_occupation"
          type="text"
          placeholder="Занятие"
          id="form-job"
          name="about"
          required
          minLength={2}
          maxLength={200}
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="form-job-error" />
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
