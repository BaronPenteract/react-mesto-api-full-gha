import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Card from '../Card';
import CardSceleton from '../Card/CardSceleton';
import Footer from '../Footer';
import AvatarSceleton from './AvatarSceleton';
import ProfileInfoSceleton from './ProfileInfoSceleton';

export default function Main({
  isCardsLoaded,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <li key={card._id}>
      <Card
        {...card}
        onCardClick={() => {
          onCardClick(card);
        }}
        onCardLike={() => {
          onCardLike(card);
        }}
        onCardDelete={() => {
          onCardDelete(card);
        }}
      />
    </li>
  ));

  const cardsSceletonElements = [...new Array(6)].map((_, idx) => (
    <li key={idx}>
      <CardSceleton />
    </li>
  ));

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              {avatar ? (
                <img className="profile__avatar" src={avatar} alt="Аватарка путешественника" />
              ) : (
                <AvatarSceleton className="profile__avatar" />
              )}
              <button
                className="profile__btn-avatar-edit anim-avatar-button"
                type="button"
                title="Изменить аватар"
                onClick={onEditAvatar}
              ></button>
            </div>
            {name && about ? (
              <div className="profile__info">
                <h1 className="profile__title">{name}</h1>
                <button
                  className="profile__btn-edit"
                  type="button"
                  title="Редактировать"
                  onClick={onEditProfile}
                ></button>
                <p className="profile__subtitle">{about}</p>
              </div>
            ) : (
              <ProfileInfoSceleton className="profile__info" />
            )}
          </div>
          <button
            className="profile__btn-add"
            type="button"
            title="Добавить новое место"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="cards" aria-label="Места, где побывал">
          <ul className="cards__list">{isCardsLoaded ? cardsElements : cardsSceletonElements}</ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
