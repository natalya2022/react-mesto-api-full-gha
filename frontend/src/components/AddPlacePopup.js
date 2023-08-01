import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [namePlace, setNamePlace] = useState('');
  const [linkPlace, setLinkPlace] = useState('');

  useEffect(() => {
    setNamePlace('');
    setLinkPlace('');
  }, [isOpen]);

  function handleChangeNamePlace(e) {
    setNamePlace(e.target.value);
  }

  function handleChangeLinkPlace(e) {
    setLinkPlace(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: namePlace,
      link: linkPlace
    });
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'place'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
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
          value={namePlace || ''}
          onChange={handleChangeNamePlace}
        />
        <span className="form-place-error" />
        <input
          className="popup__input popup__text popup__text_position_second-line popup__text_field_url"
          type="url"
          placeholder="Ссылка на картинку"
          id="form-url"
          name="link"
          required
          value={linkPlace || ''}
          onChange={handleChangeLinkPlace}
        />
        <span className="form-url-error" />
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
