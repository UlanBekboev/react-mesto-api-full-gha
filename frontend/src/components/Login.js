import React from "react";
import AuthForm from "./AuthForm";

const Login = ({ onLogin }) => {
  function handleSubmit(values) {
    onLogin(values);
  }

  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    />
  );
}

export default Login;