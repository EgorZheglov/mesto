import {openPopup, closeByEsc, closeByOverlay, popupPhoto, closePopup} from '../utils/utils.js';

export default class Card{

    constructor(name, link, templateId){
        this.name = name;
        this.link = link;
        this.cardTemplate = document.querySelector(templateId); //Возможно стоит передавать сразу cardTemplate.content?
    }
    
    _getTemplate(){
        const cardElement = this.cardTemplate.content
        .querySelector(".elements__item")
        .cloneNode(true);
  
      return cardElement;
      }
    
    _setEventListeners(card){
        const deleteButton = card.querySelector(".elements__delete-button");
        const photoLikeButton = card.querySelector(".elements__like-button");
        const openPopupPhotoButton = card.querySelector(".elements__popup-button");

        openPopupPhotoButton.addEventListener("click", (event) => { //Долго не мог понять, почему с обычным объявлением функции попап ломается. (;
            openPopup(popupPhoto);
            popupPhoto.querySelector(".popup__photo").src = this.link;
            popupPhoto.querySelector(".popup__photo").alt = this.name + "";
            popupPhoto.querySelector(".popup__photo-title").textContent = this.name;
        });
        
        photoLikeButton.addEventListener("click", function (event) {
            photoLikeButton.classList.toggle("elements__like-button_active");
          });
          deleteButton.addEventListener("click", function (event) {
            event.target.closest(".elements__item").remove();
          });
    }

    createCard(){
        const newCard = this._getTemplate();
        
        this._setEventListeners(newCard);

        newCard.querySelector(".elements__title").textContent = this.name;
        newCard.querySelector(".elements__photo").src = this.link;
        newCard.querySelector(".elements__photo").alt = this.name + "";

          return newCard;
    }

}