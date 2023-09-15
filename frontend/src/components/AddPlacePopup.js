import React from "react"
import PopupWithForm from "./PopupWithForm"
import InputWithValidation from "./InputWithValidation";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  
  const [ name, setName ] = React.useState('');
  const [ link, setLink ] = React.useState('');

  const [ isNameInputValid, setIsNameInputValid ] = React.useState(false);
  const [ isLinkInputValid, setIsLinkInputValid ] = React.useState(false);

  const [ isSubmitBtnActive, setIsSubmitBtnActive ] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    (isNameInputValid && isLinkInputValid && (name !== '') && (link !== '')) ? setIsSubmitBtnActive(true) : setIsSubmitBtnActive(false);
  }, [ isNameInputValid, isLinkInputValid, name, link ])

  React.useEffect(() => {
    setName('');
    setLink('');
    setIsNameInputValid(true);
    setIsLinkInputValid(true);
    setIsSubmitBtnActive(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-location"
      title="Новое место"
      submitBtnTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitBtnActive={isSubmitBtnActive}
    >
      <InputWithValidation
        name="name"
        id="location-name-input"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={name}
        setValue={setName}
        setIsInputValid={setIsNameInputValid}
        isInputValid={isNameInputValid}
      />
      <InputWithValidation
        name="link"
        id="location-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        setValue={setLink}
        setIsInputValid={setIsLinkInputValid}
        isInputValid={isLinkInputValid}
      />
    </PopupWithForm>
  )
}