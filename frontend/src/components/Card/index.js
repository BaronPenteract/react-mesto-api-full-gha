import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Card({ name, link, likes, owner, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwner = owner._id === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);

  const handleDeleteClick = () => {
    onCardDelete();
  };

  const handleLikeClick = () => {
    onCardLike();
  };

  return (
    <article>
      <div className="cards__item">
        <button
          className={`cards__delete ${isOwner && 'cards__delete_active'}`}
          type="button"
          title="Удалить"
          onClick={handleDeleteClick}
        ></button>
        <img className="cards__image" src={link} alt={name} onClick={onCardClick} />
        <div className="cards__content">
          <h2 className="cards__title">{name}</h2>
          <div className="cards__likes-container">
            <button
              className={`cards__like ${isLiked && 'cards__like_active'}`}
              type="button"
              title="Поставить лайк"
              onClick={handleLikeClick}
            ></button>
            <span className="cards__like-amount">{likes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
