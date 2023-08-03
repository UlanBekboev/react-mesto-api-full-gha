import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ isOpen, name, onClose, card }) => {
  return (
    <Popup 
      isOpen={isOpen} 
      onClose={onClose}
      name="photo"
    >
      <figure className="popup__image-opened">
        <img className="popup__image" src={card.link} alt={card.name}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
     
    </Popup>
  );
};

export default ImagePopup;


