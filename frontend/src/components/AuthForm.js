import React from "react";
import useFormValidation from "../hooks/useFormValidation";

const AuthForm = ({ title, buttonText, onSubmit }) => {
  const { enteredValues, errors, handleChange } = useFormValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(enteredValues);
  }

  return (
    <section className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={enteredValues.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="login__error">{errors.email}</span>}
        <input
          type="password"
          minLength="8"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="password"
          value={enteredValues.password || ""}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="login__error">{errors.password}</span>
        )}
        <button type="submit">{buttonText}</button>
      </form>
    </section>
  );
};

export default AuthForm;