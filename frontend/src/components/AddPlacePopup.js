import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../hooks/useFormValidation';


const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onLoading }) => {
  const { enteredValues, errors, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link,
    });
  };

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      buttonText="Сохранить"
      onLoadingText="Сохранение..."
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        className="form__input"
        required
        value={enteredValues.title || ''}
        onChange={handleChange}
      />
      <span id="name-error" className="form__input-error">
        {errors.title}
      </span>
      <input
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        className="form__input"
        required
        value={enteredValues.link || ''}
        onChange={handleChange}
      />
      <span id="job-error" className="form__input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;