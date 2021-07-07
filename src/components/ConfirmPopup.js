import Popup from './Popup.js';

export class ConfimPopup extends Popup{
    setConfirmHandler(sendDeleteFunc){
        this._sendDeleteFunc = sendDeleteFunc;
    }


    setEventListeners(){
        super.setEventListeners();

        this._form = this._popup.querySelector('.popup__form')

        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._sendDeleteFunc();
        }); 
    }

}