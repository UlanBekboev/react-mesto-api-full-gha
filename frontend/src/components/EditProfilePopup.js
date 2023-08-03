import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation";

const EditProfilePopup = ({ isOpen, onClose, onLoading, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, resetForm } =
  useFormValidation();

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  const handleSubmit = (e) => {
  e.preventDefault();
  onUpdateUser({
    name: enteredValues.name,
    about: enteredValues.about,
  });
  }

  return (
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        onLoading={onLoading}
        buttonText="Сохранить"
        onLoadingText="Сохранение..."
      >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            className="form__input"
            required
            value={enteredValues.name || ''}
            onChange={handleChange}
          />
          <span id="name-error" className="form__input-error">
            {errors.name}
          </span>
          <input
            type="text"
            name="about"
            id="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            className="form__input"
            required
            value={enteredValues.about || ''}
            onChange={handleChange}
          />
          <span id="job-error" className="form__input-error">
            {errors.about}
          </span>
      </PopupWithForm>
  )
  }

  export default EditProfilePopup;
