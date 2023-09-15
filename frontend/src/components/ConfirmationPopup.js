import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function ConfirmationPopup({ card, isOpen, onClose, onConfirmation }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmation(card._id);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      submitBtnTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitBtnActive={true}
    />
  )
}