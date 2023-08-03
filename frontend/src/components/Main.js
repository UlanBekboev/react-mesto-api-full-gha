import React from 'react';
import '../pages/index.css';
import Card from "./Card.js";
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDeleteClick, cards}) {

  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img src={avatar} alt="Аватар" className="profile__avatar"/>
          <button className="profile__avatar-btn" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <p className="profile__text">{about}</p>
          <button className="profile__edit-button profile__edit-button_action_open" type="button"
            aria-label="Открыть редактирование" onClick={onEditProfile}/>
        </div>
        <button className="profile__add-button profile__add-button_action_open" type="button"
          aria-label="Кнопка Добавить" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main;