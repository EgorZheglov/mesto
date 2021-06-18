import Popup from './Popup.js';

export class PopupWithImage extends Popup{
    openPopup(name, link){
        super.openPopup();

        this._popup.querySelector('.popup__photo').src = link;
        this._popup.querySelector('.popup__photo').alt = `${name}`;
        this._popup.querySelector('.popup__photo-title').textContent = name;
    }
}

