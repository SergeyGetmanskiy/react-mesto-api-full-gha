import React from 'react';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Route, Routes, useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth'
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {

  const navigate = useNavigate();

  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isConfirmationPopupOpen, setIsConfirmationPopupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(false);

  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ email, setEmail ] = React.useState('');
  const [ headerBtnTitle, setHeaderBtnTitle ] = React.useState('Регистрация');
  const [ isRegistered, setIsRegistered ] = React.useState(false);
  
  const [ selectedCard, setSelectedCard ] = React.useState({});
  const [ isImagePopupOpen, setIsImagePopupOpen ] = React.useState(false);    

  const [ currentUser, setCurrentUser ] = React.useState({name: '', about: '', avatar: ''});

  const [ cards, setCards ] = React.useState([]);
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);    
  }

  function handleConfirmationSubmit(cardId) {
    api.deleteUserCard(cardId).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardId));
      closeAllPopups();
     })
    .catch((err) => {
    console.log(err);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo).then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(avatar) {
    
    api.setUserAvatar(avatar).then(res => {
      setCurrentUser(res);
      closeAllPopups();
      
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(place) {
    api.postUserCard(place).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
  })
    .catch((err) => {
      console.log(err);
    })
  }

  function navigateToSignUp() {                       // Авторизация и аутентификация
    setHeaderBtnTitle('Войти');
    navigate('/sign-up', {replace: true});
  }

  function navigateToSignIn() {
    setHeaderBtnTitle('Регистрация');
    navigate('/sign-in', {replace: true});
  }

  function handleHeaderBtnClick() {                  // Обработчик клика в шапке сайта 
    if (loggedIn) {
      handleSignOut();
    } else if (headerBtnTitle === 'Регистрация') {
      navigateToSignUp();
    } else if (headerBtnTitle === 'Войти') {
      navigateToSignIn();
    }
  }

  function handleRegister(email, password) {          // Регистрация
    auth.register(email, password)
    .then((res) => {
        navigateToSignIn();
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
      } )
    .catch((err) => {
      console.log(err); 
      navigateToSignUp();
      setIsRegistered(false);
      setIsInfoTooltipOpen(true);
    })  
  }

  function handleLogin(email, password) {             // Вход
    auth.login(email, password)
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(email);
        setHeaderBtnTitle('Выйти');
        navigate('/', {replace: true});
        api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
      })
    .catch((err) => {
      console.log(err);
      navigateToSignIn();
      setLoggedIn(false);
      setIsRegistered(false);
      setIsInfoTooltipOpen(true);
    })  
  }   

  function handleSignOut() {                          // Выход
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsRegistered(false);
    setEmail('');
    navigateToSignIn();
  }

  React.useEffect(() => {                             // Проверка токена
    const checkToken = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.checkToken(jwt)
        .then((res) => {
            setLoggedIn(true);
            setEmail(res.email);
            setHeaderBtnTitle('Выйти');        
            navigate("/", {replace: true})
          })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          navigateToSignIn();
        })  
      }
    } 
  checkToken();
  }, [])

  React.useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getCardList() ])
    .then(([ userInfo, initialCards ]) => {
      setCurrentUser(userInfo);
      setCards(initialCards);
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={loggedIn}
                  headerBtnTitle={headerBtnTitle}
                  email={email}
                  handleClick={handleHeaderBtnClick}
          />    
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Main}
                                                     loggedIn={loggedIn}
                                                     cards={cards}
                                                     onEditProfile={handleEditProfileClick}
                                                     onEditAvatar={handleEditAvatarClick}
                                                     onAddPlace={handleAddPlaceClick}
                                                     onCardClick={handleCardClick}
                                                     onCardDelete={handleCardDelete}
                                                     onCardLike={handleCardLike}
                                                     />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister}
                                                      navigateToSignIn={navigateToSignIn}
                                                      />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          </Routes>
          <Footer />
          <EditAvatarPopup                          // Попапы
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit} />
          <ConfirmationPopup 
            card={selectedCard} 
            isOpen={isConfirmationPopupOpen} 
            onClose={closeAllPopups} 
            onConfirmation={handleConfirmationSubmit} />
          <ImagePopup 
            card={selectedCard} 
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          /> 
          <InfoTooltip
            isOpen={isInfoTooltipOpen} 
            onClose={closeAllPopups} 
            isRegisterOk={isRegistered}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
