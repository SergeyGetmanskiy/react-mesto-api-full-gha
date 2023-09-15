import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ handleLogin }) {

  return (
    <AuthForm formName="login"
              onSubmit={handleLogin}
              formTitle="Вход"
              submitBtnTitle="Войти" />
  )
}