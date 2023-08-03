import React, { useRef, useState }from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onLoading, onUpdateAvatar }) => {
  const inputRef = useRef();
  const [avatarValue, setAvatarValue] = useState();

  const handleAvatarValue = () => {
    setAvatarValue(inputRef.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarValue,
    })
  }

  return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        onLoading={onLoading}
        buttonText="Сохранить"
        onLoadingText="Сохранение..."
        onSubmit={handleSubmit}
      >
          <input
            type="url"
            name="avatar"
            id="avatar"
            placeholder="Ссылка на картинку"
            className="form__input"
            required
            ref={inputRef}
            value={avatarValue || ''}
            onChange={handleAvatarValue}
          />
          <span id="avatar-error" className="form__input-error"></span>
      
      </PopupWithForm>
  )
}

export default EditAvatarPopup;
