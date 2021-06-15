export default class Card{

    constructor(name, link, templateSelector){
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector; 
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