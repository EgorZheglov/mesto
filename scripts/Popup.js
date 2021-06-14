export default class Popup{

    constructor(popupSelector)
    {
        this._popup = document.querySelector(popupSelector);
    }

    _closeByEsc(evt) {
        if (evt.key==='Escape'){
          this._closePopup();
        }
    }

    _closeByOverlay(evt) {
        if(evt.target.classList.contains('popup'))
        {
          this.closePopup(); 
        }
    }
    

    _setEventListeners = () => {
        this._popup
        .querySelector('.popup__close')
        .addEventListener('click', this.closePopup);    

        document.addEventListener('keydown', this._closeByEsc);

        this._popup.addEventListener("mousedown", this._closeByOverlay);
    }

    closePopup = () => {
        document.removeEventListener('keydown', this._closeByEsc);
        this._popup.removeEventListener('mousedown', this._closeByOverlay);
        this._popup.classList.remove('popup_is-opened');
    }

    openPopup = () => {
        this._popup.classList.add('.popup_is-opened');
        this._setEventListeners();
    }
}