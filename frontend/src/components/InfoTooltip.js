import successIcon from '../images/onSuccess.svg';
import unsuccessIcon from '../images/unSuccess.svg';
import Popup from './Popup';

const InfoTooltip = ({ isOpen, onClose, name, onSuccess }) => {
  return (
    <Popup 
      isOpen={isOpen} 
      onClose={onClose}
      name='infoTool'
    >
      <img
        src={onSuccess ? successIcon : unsuccessIcon}
        alt={
          onSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
        }
        className="popup__signup-icon"
      />
      <h3 className="popup__signup-title">
        {onSuccess
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h3>
    </Popup>
  );
};

export default InfoTooltip;