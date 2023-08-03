import useFormValidation from "../hooks/useFormValidation";
import Popup from "./Popup";

const PopupWithForm = ({isOpen, name, onClose, ...props}) => {
  const { isFormValid } = useFormValidation();

  return (
    <Popup 
      isOpen={isOpen} 
      name={name} 
      onClose={onClose}
    >
      <h2 className="popup__heading">{props.title}</h2> 
      <form className="popup__form form" action="#" name={props.name} onSubmit={props.onSubmit}> 
        <fieldset className="form__set"> 
          {props.children} 
          <button 
            type="submit"  
            className="form__submit-button"  
            aria-label={`Кнопка ${props.buttonText}`}  
            disabled={isFormValid}> 
            {props.onLoading ? props.onLoadingText : props.buttonText} 
          </button> 
        </fieldset> 
      </form> 
    </Popup>
  )
}

export default PopupWithForm;
