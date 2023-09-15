import React from "react"
import PopupWithForm from "./PopupWithForm"
import InputWithValidation from "./InputWithValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');

  const [ isNameInputValid, setIsNameInputValid ] = React.useState(true);
  const [ isDescriptionInputValid, setIsDescriptionInputValid ] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
     
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameInputValid(true);
    setIsDescriptionInputValid(true);
  }, [currentUser, isOpen]); 

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitBtnTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitBtnActive={isNameInputValid && isDescriptionInputValid}
    >
      <InputWithValidation
        name="name"
        id="user-name-input"
        type="text"
        placeholder="Имя"
        minLength={2} 
        maxLength={40}
        value={name}
        setValue={setName}
        setIsInputValid={setIsNameInputValid}
        isInputValid={isNameInputValid}
      />
      <InputWithValidation
        name="about"
        id="user-occupation-input"
        type="text"
        placeholder="Вид деятельности"
        minLength={2}
        maxLength={200}
        value={description}
        setValue={setDescription}
        setIsInputValid={setIsDescriptionInputValid}
        isInputValid={isDescriptionInputValid}
      />
    </PopupWithForm>
  )
}