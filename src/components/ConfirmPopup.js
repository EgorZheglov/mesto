import Popup from './Popup.js';

export class ConfimPopup extends Popup{

    setConfirmHandler(sendDeleteFunc){
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) =>{
            evt.preventDefault()
            sendDeleteFunc();
            this.closePopup();
        })
    }
}