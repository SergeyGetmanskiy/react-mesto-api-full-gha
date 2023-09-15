import React from "react";

export default function InputWithValidation({ name,
                                              id,
                                              type,
                                              placeholder,
                                              minLength,
                                              maxLength,
                                              value,
                                              setValue,
                                              setIsInputValid,
                                              isInputValid }) {

  const [ errorMessage, setErrorMessage ] = React.useState('');
  
  function handleChange(e) {
    setInputValue(e);
    checkInputValidity(e);
  }
 
  function setInputValue(e) {
    setValue(e.target.value);
  }

  function checkInputValidity(e) {
    if (!e.target.validity.valid) {
      setErrorMessage(e.target.validationMessage);
      setIsInputValid(false);
    } else { 
      setErrorMessage('');
      setIsInputValid(true);
    }
  }

  return (
    <div className="input__container">
      <input
        onChange={handleChange}
        className={`form__input
                  ${ name === "email" || name === "password" ? "form__input_place_register" : "" }
                  ${ isInputValid ? '' : 'form__input_type_error' } `}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        required
      />
      <span className={`form__error ${ isInputValid ? '' : 'form__error_visible' }`}>{errorMessage}</span>
    </div>
  )
}