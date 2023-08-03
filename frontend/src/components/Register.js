import React from "react";
import AuthForm from "./AuthForm";

const Register = ({ onRegister }) => {
  function handleSubmit(values) {
    onRegister(values);
  }

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
    />
  );
}

export default Register;