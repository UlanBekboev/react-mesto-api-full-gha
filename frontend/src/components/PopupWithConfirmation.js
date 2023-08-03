import React from "react";
import PopupWithForm from "./PopupWithForm";
import '../pages/index.css';

function PopupWithConfirmation({ isOpen, onClose, onLoading, onOk, card }) {
  const handleSubmit = (e) => {
    e.preventDefault(e);
    onOk(card);
  };

  return (
    <PopupWithForm
      name="avatar-form"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      buttonText="Да"
      onLoadingText="Удаление..."
      onSubmit={handleSubmit}
    />
)
}

export default PopupWithConfirmation;
