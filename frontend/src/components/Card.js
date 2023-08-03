import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((id) => id === currentUser._id);

  const centeredLikeElement = (
    `element__likes ${
      card.likes.length === 0 && "element__likes_centered"
    }`
  );
  const cardLikeButtonClassName = (
    `element__like ${
      isLiked && "element__like_active"
    }`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDeleteClick(card._id);
  };

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__flex-row">
        <h3 className="element__title">{card.name}</h3>
        <div className={centeredLikeElement}>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          {card.likes.length > 0 && (
            <span className="element__likes-num">{card.likes.length}</span>
          )}
        </div>
        {isOwn && <button
            type="button"
            className="element__trash"
            onClick={handleDeleteClick}
          />
          }
      </div>
    </div>
  );
};

export default Card;
