import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onImagePopup,
  onCardLike,
  onCardDelete
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__fill">
          <div className="profile__base" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button
            className="profile__add"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          />
        </div>
      </section>
      <section className="photo-grid" aria-label="Фотогалерея">
        <ul className="photo-grid__places">
          {cards.map(card => (
            <Card
              key={card._id}
              onImagePopup={onImagePopup}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
