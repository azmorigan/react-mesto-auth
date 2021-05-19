import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React from "react";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  // Состояне попапов (открытие/закрытие)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: '', alt: '', isOpen: false})
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React
    .useState(false)

  // Список карточек
  const [cards, setCards] = React.useState([])

  // Данные профиля
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  })

  // id удаляемой карточки
  const [deleteCardId, setDeleteCardId] = React.useState('')

  // Зашел ли пользователь в аккаунт
  const [loggedIn, setLoggedIn] = React.useState(false)

  const history = useHistory()
  // Email пользователя
  const [email, setEmail] = React.useState('')
  // Данные для анимации загрузки
  const [isLoading, setIsLoading] = React.useState(false)
  const buttonNameConfirm = ({onLoad: "Удаление...", isLoad: "Да"})
  const buttonNameEdit = ({onLoad: "Сохранение...", isLoad: "Сохранить"})
  const buttonNameAddPlace = ({onLoad: "Создание...", isLoad: "Создать"})

  // Пробрасывается в InfoTooltip и открывает соотв. попап
  const [enterStatus, setEnterStatus] = React.useState(''
  )
  // Текст для всплывающей подсказки
  const infoTooltipText = {
    success: "Вы успешно зарегистрировались!",
    fail: "Что-то пошло не так! Попробуйте ещё раз."
  }
  // Открыть попапы
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleConfirmationPopup(id) {
    setIsConfirmationPopupOpen(true)
    setDeleteCardId(id)
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true)
  }

  // Нажать на картинку
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setSelectedCard({isOpen: false})
    setIsInfoTooltipOpen(false)
  }

  // Обновление имени и описания профиля
  function handleUpdateUser({name, about}) {
    renderLoading(true)
    api.setProfileInfo(name, about)
      .then(res => {
          setCurrentUser(res)
          closeAllPopups()
        }
      )
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false)
      })
  }

  // Обновление аватара
  function handleUpdateAvatar({avatar}) {
    renderLoading(true)
    api.setUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false)
      })
  }

  // Добавление карточки
  function handleAddPlace(data) {
    renderLoading(true)
    api.addCard(data, localStorage.getItem('jwt'))
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false)
      })
  }
  // Поставить лайк
  function handleCardLike(card) {
    // card - карточка, которую отправляем через PUT
    // newCard - лайкнутая карточка с обновленным массивом likes
    // oldCard - любая карточка из старого массива
    const isLiked = card.likes.some(i => i === currentUser._id)
    api.toggleLikeCard(card.id, !isLiked, localStorage.getItem('jwt'))
      .then((newCard) => {
        const newCards = cards.map((oldCard) => {
          return oldCard._id === card.id ? newCard : oldCard
        })
        setCards(newCards)
      })
      .catch(err => console.log(err))
  }

  // Удаление карточки
  function handleCardDelete(cardId) {
    renderLoading(true)
    api.deleteCard(cardId, localStorage.getItem('jwt'))
      .then(() => {
        const newCards = cards.filter(oldCard => oldCard._id !== cardId)
        setCards(newCards)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false)
      })
  }

  // Баг: если зажать курсор на попапе и отпустить на оверлее, то закроется попап
  // Закрытие по клику на оверлей
  function handleClickOnOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  // Закрытие по ESC
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }

  // Изменение текста кнопки
  function changeButtonName(button) {
    return isLoading ? button.onLoad : button.isLoad
  }

  // Баг: т.к. попап закрывается медленно, а renderLoading(false) срабатывает мгновенно, то при закрытии попапа видно изменение текста кнопки
  function renderLoading(state) {
    setIsLoading(state)
  }

  // Регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res) {
          setEnterStatus(true)
          handleInfoTooltipOpen()
          history.push('/sign-in')
        }
      })
      .catch(() => {
        setEnterStatus(false)
        handleInfoTooltipOpen()
      })
  }

  // Вход в аккаунт
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.jwt)
        setLoggedIn(true)
        setEmail(email)
        history.push('/')
      })
      .catch(() => {
        setEnterStatus(false)
        handleInfoTooltipOpen()
      })
  }
  // Проверка токена, автом. вход, если до этого авторизовался
  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth.checkToken(jwt)
        .then(res => {
          setLoggedIn(true)
          setEmail(res.email)
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }
  // Выйти из аккаунта
  function handleSignOut() {
    localStorage.removeItem('jwt')
    setEmail('')
    history.push('/sign-in')
    setLoggedIn(false)
  }

  // Проверка токена при отрисовке App
    React.useEffect(() => {
      handleTokenCheck()
    }, [])

  // Загрузить и отрисовать карточки
  React.useEffect(() => {
    api.getInitialCards(localStorage.getItem('jwt'))
      .then((cardList) => {
        setCards(cardList)
      })
      .catch(err => err.status)
  }, [loggedIn])

  // Загрузить и установить данные профиля
  React.useEffect(() => {
    api.getProfileInfo(localStorage.getItem('jwt'))
      .then(res => setCurrentUser(res))
      .catch(err => err.status)
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__page" onKeyDown={handleEscClose} tabIndex={0}>

        <Header
          onSignOut={handleSignOut}
          email={email}
        />

        <Switch>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}/>
          </Route>

          <ProtectedRoute
            path={"/"}
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleConfirmationPopup}
          />

          <Route>
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>

        </Switch>
        {loggedIn && <Footer/>}

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onClickOnOverlay={handleClickOnOverlayClose}
          enterStatus={enterStatus}
          text={infoTooltipText}/>

        <ImagePopup
          onClickOnOverlay={handleClickOnOverlayClose}
          card={selectedCard}
          onClose={closeAllPopups}/>

        <EditProfilePopup
          onClickOnOverlay={handleClickOnOverlayClose}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={changeButtonName(buttonNameEdit)}/>

        <AddPlacePopup
          onClickOnOverlay={handleClickOnOverlayClose}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          buttonName={changeButtonName(buttonNameAddPlace)}/>

        <ConfirmationPopup
          onClickOnOverlay={handleClickOnOverlayClose}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          deleteCardId={deleteCardId}
          buttonName={changeButtonName(buttonNameConfirm)}/>

        <EditAvatarPopup
          onClickOnOverlay={handleClickOnOverlayClose}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={changeButtonName(buttonNameEdit)}/>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
