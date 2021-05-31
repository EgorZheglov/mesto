export default class FormValidator{

    constructor(config, form){
        this._config = config;
        this._form = document.querySelector(form);
        //this._form.addEventListener("submit", submitFormHandlerAdd);
    }

    _showInputError = (_inputElement, _errorMessage) => {
        _inputElement.classList.add(this._config.inputErrorClass);
        const _errorElement = this._form.querySelector(`#${_inputElement.id}-error`);
        _errorElement.classList.add(this._config.errorClass);
        _errorElement.textContent =  _errorMessage;
    }
    
    _hideInputError = (_inputElement) => {
        const _errorElement = this._form.querySelector(`#${_inputElement.id}-error`);
        _errorElement.classList.remove(this._config.errorClass);
        _inputElement.classList.remove(this._config.inputErrorClass);
        _errorElement.textContent = ' '; 
    }
    
    
    _checkInputValidity = (_inputElement) => {
       if(_inputElement.validity.valid){
          this._hideInputError(_inputElement);
        } else {
          this._showInputError(_inputElement, _inputElement.validationMessage);
        }
    }
    
    
    _hasInvalidInput = (_inputList) =>{
        return _inputList.some(_inputElement => !_inputElement.validity.valid);
    }
    
    
    _toggleButtonState = (_buttonElement, _inputList) =>{
     if(this._hasInvalidInput(_inputList)){
          _buttonElement.disabled = true;
          _buttonElement.classList.add(this._config.inactiveButtonClass);
     } else {
          _buttonElement.disabled = false;
          _buttonElement.classList.remove(this._config.inactiveButtonClass);
         }
    }
    
    _setEventListeners = () => {
        const _buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        const _inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        _inputList.forEach((_inputElement) =>{
            _inputElement.addEventListener('input', () => {
                this._checkInputValidity(_inputElement);
                this._toggleButtonState(_buttonElement, _inputList);
                }
            );
        })
        //set initial button 
        this._toggleButtonState(_buttonElement, _inputList);   
    }

    enableValidation = () => {
        this._setEventListeners();
       // const formList = Array.from(document.querySelectorAll(config.formSelector));
      //  formList.forEach((formElement) => {
      //      setEventListeners(formElement, config);
      //      }
     //   )
     console.log(1);
    }
}