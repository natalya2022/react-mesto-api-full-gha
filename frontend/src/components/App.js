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
import PopupDeleteCard from './PopupDeleteCard';
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
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [isUserSending, setIsUserSending] = useState(false);
  const [isUserAvatarSending, setIsUserAvatarSending] = useState(false);
  const [isAddPlaceSending, setIsAddPlaceSending] = useState(false);
  const [isDeleteCardSending, setIsDeleteCardSending] = useState(false);
  const [isLoginSending, setIsLoginSending] = useState(false);
  const [isRegisterSending, setIsRegisterSending] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          setIsUserEmail(user.email);
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
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setIsDeleteCardSending(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== cardForDelete._id));
        setIsDeleteCardPopupOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsDeleteCardSending(false));
  }

  function handleCardDeteteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleUpdateUser(name, about) {
    setIsUserSending(true);
    api
      .editUserProfile(name, about)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsUserSending(false));
  }

  function handleAddPlaceSubmit(item) {
    setIsAddPlaceSending(true);
    api
      .addNewCard(item)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsAddPlaceSending(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsUserAvatarSending(true);
    api
      .editUserAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsUserAvatarSending(false));
  }

  function handleNewUserReg(email, password) {
    setIsRegisterSending(true);
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
      })
      .finally(() => setIsRegisterSending(false));
  }

  function handleUserLogin(email, password) {
    setIsLoginSending(true);
    auth
      .authorize(email, password)
      .then(res => {        
        setIsLoggedIn(true);
        setIsUserEmail(email);
        navigate('/');
      })
      .catch(err => {
        console.error(err);        
        setToooltipMessage(toolMessages[toolMessage.err]);
        handleInfoTooltipOpen();
      })
      .finally(() => setIsLoginSending(false));
  }

  useEffect(() => {    
    handleCheckToken();
    // eslint-disable-next-line
  }, []);

  function handleCheckToken() {
    if (isLoggedIn) { 
      navigate('/');     
      return ;
    }    
    auth
      .checkToken()
      .then(res => {
        setIsLoggedIn(true);
        setIsUserEmail(res.email);
        navigate('/');        
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }


  function userLogOut() {
    setIsUserEmail('');
    auth.logOut();
    navigate('/signin');
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    setIsMobileMenuOpen(false);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <div className="wrap">
            <Header loggedIn={isLoggedIn} userEmail={isUserEmail} onLogOut={userLogOut} mobileMenuOpen={isMobileMenuOpen} toggleMenu={toggleMenu}/>
            <Routes>
              <Route path="/signup" element={<Register onAddUser={handleNewUserReg} isSending={isRegisterSending} />} />
              <Route path="/signin" element={<Login onUserLogin={handleUserLogin} isSending={isLoginSending}/>} />
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
                        onCardDelete={handleCardDeteteRequest}
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
            isSending={isUserSending}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSending={isUserAvatarSending}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSending={isAddPlaceSending}
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
          <PopupDeleteCard
            onClose={closeAllPopups}                       
            isOpen={isDeleteCardPopupOpen}
            onSubmit={handleCardDelete}
            isSending={isDeleteCardSending}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
