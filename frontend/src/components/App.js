import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import regfalse from './../images/regfalse.svg';
import regtrue from './../images/regtrue.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [imageData, setImageData] = useState({ link: '', name: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState('');  
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [toooltipMessage, setToooltipMessage] = useState({ link: '', text: '' });  
  const navigate = useNavigate();

  const toolMessage = { ok: 0, err: 1};
  const toolMessages = [
    {link: regtrue, text: 'Вы успешно зарегистрировались!'},
    {link: regfalse, text: 'Что-то пошло не так! Попробуйте еще раз.'},
  ];

  
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(console.error);
    } else {
      setCurrentUser({});
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then(cards => {
          setCards(cards);
        })
        .catch(console.error);
    } else {
      setCards([]);
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = evt => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = evt => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = evt => {
    setAddPlacePopupOpen(true);
  };

  const handleImagePopupClick = (link, name) => {
    setImagePopupOpen(true);
    setImageData({ link, name });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(newCards => {
        setCards(cards => cards.filter(c => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleUpdateUser(name, about) {
    api
      .editUserProfile(name, about)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(item) {
    api
      .addNewCard(item)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleNewUserReg(email, password) {
    auth
      .register(email, password)
      .then(res => {
        handleInfoTooltipOpen();        
        setToooltipMessage(toolMessages[toolMessage.ok]);
        navigate('/signin');
      })
      .catch(err => {
        console.error(err);        
        setToooltipMessage(toolMessages[toolMessage.err]);
        handleInfoTooltipOpen();
      });
  }

  function handleUserLogin(email, password) {
    auth
      .authorize(email, password)
      .then(res => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        setIsUserEmail(email);
        navigate('/');
      })
      .catch(err => {
        console.error(err);        
        setToooltipMessage(toolMessages[toolMessage.err]);
        handleInfoTooltipOpen();
      });
  }

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line
  }, []);

  function handleCheckToken() {
    if (!localStorage.getItem('token')) {
      return;
    }
    const token = localStorage.getItem('token');
    auth
      .checkToken(token)
      .then(res => {
        setIsLoggedIn(true);
        setIsUserEmail(res.data.email);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  function userLogOut() {
    setIsUserEmail('');
    localStorage.removeItem('token');
    navigate('/signin');
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <div className="wrap">
            <Header loggedIn={isLoggedIn} userEmail={isUserEmail} onLogOut={userLogOut} />
            <Routes>
              <Route path="/signup" element={<Register onAddUser={handleNewUserReg} />} />
              <Route path="/signin" element={<Login onUserLogin={handleUserLogin} />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    loggedIn={isLoggedIn}
                    element={
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onImagePopup={handleImagePopupClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                      />
                    }
                  />
                }
              />
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            link={imageData.link}
            name={imageData.name}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            onClose={closeAllPopups}           
            toooltipMessage={toooltipMessage}
            isOpen={isInfoTooltipOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
