import Popup from './Popup.js';

export class PopupWithForm extends Popup{

    constructor({popupSelector, popupSubmitFunction}) {
        super(popupSelector);
        this._submitFunction = popupSubmitFunction;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save-button');
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', this._submitFormHandeler);
    }

    _submitFormHandeler = (evt) =>{
        evt.preventDefault();
        this.renderLoading(true);
        this._submitFunction(this._getInputValues()) 
    }


    _getInputValues(){
        const inputArr = Array.from(this._popup.querySelectorAll('.popup__input'));
        const inputObj = {};
        inputArr.forEach((element) => {   
            inputObj[element.name] = element.value;
        });   

        return inputObj;
    }

    renderLoading(isLoading){
        if(isLoading){
            this._submitButton.textContent = 'Сохранение...'
        }else{
            this._submitButton.textContent = 'Сохранить'
        }
    }

    closePopup(){
        super.closePopup();
        this._form.reset();
    }
}

