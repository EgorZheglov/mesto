export default class Card{

    constructor({name, link, likeQuantity, id, templateSelector, handleCardClick, putLikeFunc}){
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector; 
        this._handleCardClick = handleCardClick;
        this._likeQuantity = likeQuantity;
        this._id = id; 
        this._putLikeFunc = putLikeFunc;
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

      

      if(this.photoLikeButton.classList.contains('elements__like-button_active')){
        this.newCard.querySelector('.elements__like-quantity').textContent++;
        this._putLikeFunc(this._id)
      }
      else{
        this.newCard.querySelector('.elements__like-quantity').textContent--;
      }
    }

    _setEventListeners(){
        this.deleteButton =  this.newCard.querySelector(".elements__delete-button");
        this.photoLikeButton =  this.newCard.querySelector(".elements__like-button");
        this.openPopupPhotoButton =  this.newCard.querySelector(".elements__popup-button");

        this.openPopupPhotoButton.addEventListener("click", (evt) =>{
          this._handleCardClick(this.name, this.link);
        });
        
        this.photoLikeButton.addEventListener("click", this._likeButtonClick);

        this.deleteButton.addEventListener("click", this._deleteButtonClick);
    }

    createCard(){
        this.newCard = this._getTemplate();
        
        this._setEventListeners();
        this.newCard.querySelector(".elements__title").textContent = this.name;
        this.newCard.querySelector(".elements__photo").src = this.link;
        this.newCard.querySelector(".elements__photo").alt = `${this.name}`;
        this.newCard.querySelector('.elements__like-quantity').textContent = this._likeQuantity;
        return  this.newCard;
    }

}