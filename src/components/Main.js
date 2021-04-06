import Card from "./Card";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main className="content">

      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name}/>
            <button className="profile__avatar-button" onClick={props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Изменить профиль"
                    onClick={props.onEditProfile}/>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку"
                onClick={props.onAddPlace}/>
      </section>

      <section className="elements">

        <ul className="elements__list">
          {props.cards.map((card) => (
              <Card
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDeleteClick={props.onCardDeleteClick}
                name={card.name}
                link={card.link}
                likes={card.likes}
                id={card._id}
                key={card._id}
                owner={card.owner}
              />
            )
          )}
        </ul>
      </section>

    </main>
  )
}

export default Main;