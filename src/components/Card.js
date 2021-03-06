export default class Card{

    constructor({name, link, likesArray, cardId, cardOwner, userId, templateSelector, handleCardClick, toggleLikeFunc, handleDeleteClick}){
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector; 
        this._handleCardClick = handleCardClick;
        this._likesArray = likesArray;
        this._cardId = cardId; 
        this._toggleLikeFunc = toggleLikeFunc;
        this._userId = userId;
        this._owner = cardOwner;
        this._handleDeleteClick = handleDeleteClick;
    }
    
    _getTemplate(){
        this.cardTemplate = document.querySelector(this.templateSelector);
        const cardElement = this.cardTemplate.content
        .querySelector(".elements__item")
        .cloneNode(true);
      return cardElement;
      }
    
    deleteButtonClick = () => {
        this.newCard.remove();
      }

    _likeButtonClick = (event) => {//При нажатии на лайк отправляем нужный запрос в зависимости от того, был ли до этого поставлен лайк
      if(this.photoLikeButton.classList.contains('elements__like-button_active')){
        this._toggleLikeFunc(this._cardId,'DELETE')
      }
      else{
        this._toggleLikeFunc(this._cardId,'PUT')
      }
    }


    updateLikes(likesArr){
      this.photoLikeButton.classList.toggle('elements__like-button_active');

      this.newCard.querySelector('.elements__like-quantity').textContent = likesArr.length
    }

    _setEventListeners(){
        this.deleteButton =  this.newCard.querySelector(".elements__delete-button");
        this.photoLikeButton =  this.newCard.querySelector(".elements__like-button");
        this.openPopupPhotoButton =  this.newCard.querySelector(".elements__popup-button");

        this._isLikedBefore();

        this._checkDeleteAbility();
        
        this.openPopupPhotoButton.addEventListener("click", (evt) =>{
          this._handleCardClick(this.name, this.link);
        });
        
        this.photoLikeButton.addEventListener("click", this._likeButtonClick);

        this.deleteButton.addEventListener('click', (evt) =>{
          this._handleDeleteClick(this._cardId);
        });
    }


    _isLikedBefore(){ //Проверяем ставил Юзер лайк до этого момента через user id
      let isLiked = this._likesArray.some(likeOwner => {
        return likeOwner._id === this._userId;
      })
       
        if(isLiked){
          this.photoLikeButton.classList.toggle("elements__like-button_active");
        }
    }


    _checkDeleteAbility(){//Проверяем, может ли юзер удалить карточку.(Не может, если не он ее создал.)
      if(this._owner._id !== this._userId){
        this.deleteButton.classList.add('elements__delete-button_disabled')
      }
    }

    createCard(){
        this.newCard = this._getTemplate(); 
      
        this._setEventListeners();
        this.newCard.querySelector(".elements__title").textContent = this.name;
        this.newCard.querySelector(".elements__photo").src = this.link;
        this.newCard.querySelector(".elements__photo").alt = `${this.name}`;
        this.newCard.querySelector('.elements__like-quantity').textContent = this._likesArray.length;
        return  this.newCard;
    }

}