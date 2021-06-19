import Popup from './Popup.js';

export class PopupWithForm extends Popup{

    constructor({popupSelector, popupSubmitFunction}) {
        super(popupSelector);
        this._submitFunction = popupSubmitFunction;
    }

    setEventListeners(){
        super.setEventListeners();

        this._popup
        .querySelector('.popup__form')
        .addEventListener('submit', this._submitFormHandeler);
    }

    _submitFormHandeler = (evt) =>{
        evt.preventDefault();

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

    closePopup(){
        super.closePopup();

        this._popup
        .querySelector('.popup__form')
        .reset();
    }

}

