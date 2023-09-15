import React from "react";
import AuthForm from "./AuthForm";

export default function Register({ handleRegister, navigateToSignIn }) {

  function handleClick() {
    navigateToSignIn();
  }
   
  return (
    <AuthForm formName="register"
              onSubmit={handleRegister}
              formTitle="Регистрация"
              submitBtnTitle="Зарегистрироваться"
    >
      <button className="button button_place_register" 
              type="button"
              onClick={handleClick}>Уже зарегистрированы? Войти
      </button> 
    </AuthForm>
  )
}
 