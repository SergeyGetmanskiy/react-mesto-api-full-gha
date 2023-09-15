import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import LoadingSpinner from "./LoadingSpinner";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `button button_type_like-button ${isLiked && 'button_active'}` 
  );

  const [ isLoading, setIsLoading ] = React.useState(true); 

  function handleClick() {
    onCardClick(card);
  } 

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="card">
      <div className="card__top">
        <img className="card__image"
              src={card.link}
              alt={card.name}
              onClick={handleClick}
              style={isLoading ? {visibility: "hidden"} : {visibility: "visible"}}
              onLoad={() => setIsLoading(false)}
        />
        { !isLoading ? null : <LoadingSpinner containerClassName="spinner__container_onCard" /> }
        { isOwn && <button className="button button_type_delete-button" type="button" onClick={handleDeleteClick} /> } 
      </div>
      <div className="card__bottom">
        <h2 className="card__location">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <output className="card__like-count" id="like-count">
            {card.likes.length}
          </output>
        </div>
      </div>
    </div>
  )
}