import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PopupWithImage from './PopupWithImage.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [removedCardId, setRemovedCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [emailName, setEmailName] = useState(null);

  const navigate = useNavigate();

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };
  const oninfoTooltip = () => {
    setInfoTooltip(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleCardDeleteClick = (cardId) => {
    setIsConfirmationPopupOpen(true);
    setRemovedCardId(cardId);
  };  

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  };

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
      setCurrentUser(userData);
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }, []);

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.setUserAvatar(data, jwt)
    .then((data) => {
      setCurrentUser(data)
    })
    .then(() => closeAllPopups())
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
   }

   const handleUpdateUser = (data) => {
      setIsLoading(true);
      const jwt = localStorage.getItem('jwt');
      api.setUserInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
   
    const handleAddPlaceSubmit = (data) => {
      setIsLoading(true);
      const jwt = localStorage.getItem('jwt');
      api.addCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false);
      });
    }

    const handleCardLike = (card) => {
      const jwt = localStorage.getItem('jwt');
      const isLiked = card.likes.some(id => id === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }

    const handleCardDelete = (cardId) => {
      const jwt = localStorage.getItem('jwt');
      setIsLoading(true);
      api.handleDeleteCard(cardId, jwt)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false);
      });
    }

    const handleRegister = (data) => {
      auth.register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        oninfoTooltip();
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        oninfoTooltip();
      });
    }
  
    const handleLogin = (data) => {
      auth.authorize(data)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setEmailName(res.email);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
        oninfoTooltip();
      });
    }

    const handleSignOut = () => {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      navigate('/sign-in', {replace: true});
    }

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailName(res.email);
          }
        }).catch((err) => {
          console.error(err);
        });
      };
    }, []);

     useEffect(() => {
      if (loggedIn) {
        navigate("/", {replace: true});
      }
    }, [loggedIn, navigate]); 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/sign-in" element={
          <>
            <Header title="Регистрация"  route="/sign-up"/>
            <Login onLogin={handleLogin} />
          </>
        }/>

        <Route path="/sign-up" element={
          <>
            <Header title="Войти" route="/sign-in"/>
            <Register onRegister={handleRegister} />
          </>
        }/>

        <Route path="/" element={
          <>
            <Header title='Выйти' email={emailName} onClick={handleSignOut} loggedIn={loggedIn} route="" />
              <ProtectedRoute
                path="/"
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={onEditAvatar}
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardDeleteClick={handleCardDeleteClick}
              />
            <Footer />
          </>
        }/>

        <Route path="*" element={loggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />}/>
      </Routes>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onLoading={isLoading}
      />

      <PopupWithConfirmation
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onLoading={isLoading}
        onOk={handleCardDelete}
        card={removedCardId}
      />
      <PopupWithImage 
         card={selectedCard}
         onClose={closeAllPopups}
         isOpen={selectedCard._id} />

      <InfoTooltip 
        onSuccess={isRegistrationSuccessful}
        isOpen={infoTooltip} 
        onClose={closeAllPopups} 
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
