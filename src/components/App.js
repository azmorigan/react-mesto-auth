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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: '', alt: '', isOpen: false})

  // Список карточек
  const [cards, setCards] = React.useState([])

  // Данные профиля
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
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

  // Нажать на картинку
  function handleCardClick(card) {
    setSelectedCard(card)
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
      .finally(res => {
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
      .finally(res => {
        renderLoading(false)
      })
  }

  // Добавление карточки
  function handleAddPlace(data) {
    renderLoading(true)
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(res => {
        renderLoading(false)
      })
  }

  function handleCardLike(card) {
    // card - карточка, которую отправляем через PUT
    // newCard - лайкнутая карточка с обновленным массивом likes
    // oldCard - любая карточка из старого массива
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.toggleLikeCard(card.id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((oldCard) => {
          return oldCard._id === card.id ? newCard : oldCard
        })
        setCards(newCards)
      })
      .catch(err => console.log(err))
  }

  const [deleteCardId, setDeleteCardId] = React.useState('')

  function handleConfirmationPopup(id) {
    setIsConfirmationPopupOpen(true)
    setDeleteCardId(id)
  }

  // Удаление карточки
  function handleCardDelete(cardId) {
    renderLoading(true)
    api.deleteCard(cardId)
      .then(res => {
        const newCards = cards.filter(oldCard => oldCard._id !== cardId)
        setCards(newCards)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(res => {
        renderLoading(false)
      })
  }

  // Загрузить и отрисовать карточки
  React.useEffect(() => {
    api.getInitialCards()
      .then((cardList) => {
        setCards(cardList)
      })
      .catch(err => err.status)
  }, [])

  // Загрузить и установить данные профиля
  React.useEffect(() => {
    api.getProfileInfo()
      .then(res => setCurrentUser(res))
      .catch(err => err.status)
  }, [])

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

  const [isLoading, setIsLoading] = React.useState(false)
  const buttonNameConfirm = ({onLoad: "Удаление...", isLoad: "Да"})
  const buttonNameEdit = ({onLoad: "Сохранение...", isLoad: "Сохранить"})
  const buttonNameAddPlace = ({onLoad: "Создание...", isLoad: "Создать"})

  // Изменение текста кнопки
  function changeButtonName(button) {
    return isLoading ? button.onLoad : button.isLoad
  }

  // Баг: т.к. попап закрывается медленно, а renderLoading(false) срабатывает мгновенно, то при закрытии попапа видно изменение текста кнопки
  function renderLoading(state) {
    setIsLoading(state)
  }

  const [loggedIn, setLoggedIn] = React.useState(false)

  function handleLoggedIn() {
    setLoggedIn(true)
    // если true, в Header удаляем enter__stage
  }

  const [enter, setEnter] = React.useState(true)
  const enterTitle = enter ? "Зарегистрироваться" : "Войти"

  function handleEnterTitle() {
    setEnter(!enter)
  }

  const [enterStatus, setEnterStatus] = React.useState(''
  )

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res) {
          setEnterStatus(true)
          handleInfoTooltipOpen()
        }
      })
      .catch(err => {
        setEnterStatus(false)
        handleInfoTooltipOpen()
      })
  }
  const history = useHistory()
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(err => {
        setEnterStatus(false)
        handleInfoTooltipOpen()
      })
  }

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React
    .useState(false)

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__page" onKeyDown={handleEscClose} tabIndex={0}>
        <Header
          enter={enter}
          enterTitle={enterTitle}
          handleEnter={handleEnterTitle}/>

        <Switch>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              handleEnter={handleEnterTitle}/>
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

          <Route exact path="*">
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>

        </Switch>
        {loggedIn && <Footer/>}

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onClickOnOverlay={handleClickOnOverlayClose}
          enterStatus={enterStatus}/>

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
