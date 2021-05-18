const showInputError = (formElement, inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement) => {
   if(inputElement.validity.valid){
      hideInputError(formElement, inputElement, config);
    } else {
      showInputError(formElement, inputElement, config);
    }
}

const hasInvalidInput = (inputList) =>{
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList, config) =>{
 if(hasInvalidInput(inputList)){
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
 } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
     }
}

const setEventListeners = (formElement, config) => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(buttonElement, inputList, config);
            }
        );
    })
    //set initial button 
    toggleButtonState(buttonElement, inputList, config);   
}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
        }
    )
}

//Заранее спасибо Вам за ревью. Прошу прощения, если что-то сделано неточно 
//или недостаточно хорошо, эта работа дается особенно трудно(