import Popup from "./Popup";

export default function PopupWithForm({ name, title, submitBtnTitle, isOpen, onClose, onSubmit, isSubmitBtnActive, children }) {

  return (
    <Popup
      isOpen={isOpen}
      popupName={name}
      containerName="form"
      onClose={onClose}
    >
      <form
        className={`form form_type_${name}`}
        name={name}
        noValidate=""
        onSubmit={onSubmit} 
      >
        <h2 className="form__title">{title}</h2>
          {children}
        <button className={`form__submit-btn ${ isSubmitBtnActive ? '' : 'form__submit-btn_disabled' }`}
                type="submit"
                disabled={isSubmitBtnActive ? false : true}>{submitBtnTitle}</button>
      </form>
    </Popup>
  )
}