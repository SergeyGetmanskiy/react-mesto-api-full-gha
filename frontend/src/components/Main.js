import React from "react"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import LoadingSpinner from "./LoadingSpinner";

export default function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = React.useContext(CurrentUserContext);  

  const [ isLoading, setIsLoading ] = React.useState(true); 

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            id="avatar"
            src={currentUser.avatar}
            alt="Аватарка"
            onClick={onEditAvatar}
            style={isLoading ? {visibility: "hidden"} : {visibility: "visible"}}
            onLoad={() => setIsLoading(false)}
          />
          { !isLoading ? null : <LoadingSpinner containerClassName="spinner__container_onAvatar" /> }
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name" id="name">{currentUser.name}</h1>
          <p className="profile__user-occupation" id="about">{currentUser.about}</p>
          <button className="button button_type_edit-button" type="button" onClick={onEditProfile} />
        </div>
        <button className="button button_type_add-button" type="button" onClick={onAddPlace} />
      </section>
      <ul className="cards">  
        {cards.map((card) => (
          <li key={card._id}>
            <Card card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}/>
          </li>
        ))}
      </ul>
    </main>
  )
}