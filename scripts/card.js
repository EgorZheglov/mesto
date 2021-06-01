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
    
    createCard(){
        const newCard = this._getTemplate();
        const deleteButton = newCard.querySelector(".elements__delete-button");
        const photoLikeButton = newCard.querySelector(".elements__like-button");
        photoLikeButton.addEventListener("click", function (event) {
            photoLikeButton.classList.toggle("elements__like-button_active");
          });
          deleteButton.addEventListener("click", function (event) {
            event.target.closest(".elements__item").remove();
          });
          newCard.querySelector(".elements__title").textContent = this.name;
          newCard.querySelector(".elements__photo").src = this.link;
          newCard.querySelector(".elements__photo").alt = this.name + "";

          return newCard;
    }

}