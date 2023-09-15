import React from "react";
import InputWithValidation from "./InputWithValidation";

export default function AuthForm({ formName, onSubmit, formTitle, submitBtnTitle, children }) {

  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ isEmailInputValid, setIsEmailInputValid ] = React.useState(false);
  const [ isPasswordInputValid, setIsPasswordInputValid ] = React.useState(false);

  const isSubmitBtnActive = isEmailInputValid && isPasswordInputValid;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <section>
      <div className="form__container">
        <form
          className="form"
          name={formName}
          noValidate=""
          onSubmit={handleSubmit} 
        >
          <h2 className="form__title form__title_place_authorization">{formTitle}</h2>
          <InputWithValidation
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            setIsInputValid={setIsEmailInputValid}
            isInputValid={isEmailInputValid}
          />
          <InputWithValidation
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            minLength={8}
            maxLength={15}
            value={password}
            setValue={setPassword}
            setIsInputValid={setIsPasswordInputValid}
            isInputValid={isPasswordInputValid}
          />
          <button className={`form__submit-btn form__submit-btn_place_register 
                            ${ isSubmitBtnActive ? '' : 'form__submit-btn_place_register_disabled' }`}
                  type="submit"
                  disabled={isSubmitBtnActive ? false : true}>{submitBtnTitle}</button>
          {children}  
        </form>
      </div>
    </section> 
  )
}
 