import {openPopup, popupPhoto} from '../utils/utils.js';

export default class Card{

    constructor(name, link, templateSelector){
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector; //Возможно стоит передавать сразу cardTemplate.content?
    }
    
    _getTemplate(){
        this.cardTemplate = document.querySelector(this.templateSelector);
        const cardElement = this.cardTemplate.content
        .querySelector(".elements__item")
        .cloneNode(true);
  
      return cardElement;
      }
    

    _deleteButtonClick = (event) => {
        event.target.closest(".elements__item").remove();
      }

    _likeButtonClick = (event) => {
      this.photoLikeButton.classList.toggle("elements__like-button_active");
    }

    _popupButtonClick = (event) => {
      openPopup(popupPhoto);
      popupPhoto.querySelector(".popup__photo").src = this.link;
      popupPhoto.querySelector(".popup__photo").alt = `${this.name}`;
      popupPhoto.querySelector(".popup__photo-title").textContent = this.name;
    }

    _setEventListeners(){
        this.deleteButton =  this.newCard.querySelector(".elements__delete-button");
        this.photoLikeButton =  this.newCard.querySelector(".elements__like-button");
        this.openPopupPhotoButton =  this.newCard.querySelector(".elements__popup-button");

        this.openPopupPhotoButton.addEventListener("click", this._popupButtonClick);
        
        this.photoLikeButton.addEventListener("click", this._likeButtonClick);

        this.deleteButton.addEventListener("click", this._deleteButtonClick);
    }

    createCard(){
        this.newCard = this._getTemplate();
        
        this._setEventListeners();

        this.newCard.querySelector(".elements__title").textContent = this.name;
        this.newCard.querySelector(".elements__photo").src = this.link;
        this.newCard.querySelector(".elements__photo").alt = `${this.name}`;

        return  this.newCard;
    }

}