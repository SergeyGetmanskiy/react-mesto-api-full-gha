import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitBtnTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitBtnActive={true}  
    >
      <div className="input__container">
        <input
          ref={avatarRef}
          className="form__input"
          name="link"
          id="user-avatar-input"
          type="url"
          placeholder="http://somewebsite.com/someimage.jpg"
          required
        />
        <span className="form__error user-avatar-input-error" />
      </div>   
    </PopupWithForm> 
  )
}