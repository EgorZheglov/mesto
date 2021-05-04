let openPopupButtonEdit = document.querySelector('.profile__edit-button');
let openPopupButtonAdd = document.querySelector('.profile__add-button');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup-add');
let closePopupAddButton = document.querySelector('.popup__close_add');
let closePopupEditButton = document.querySelector('.popup__close_edit');
let formEditElement = document.querySelector('.popup__form_edit');
let formAddElement = document.querySelector('.popup__form_add');
let nameInput = document.querySelector('#name_input');
let jobInput = document.querySelector('#profession_input');
let photoNameInput = document.querySelector('#photo-name_input');
let photoLinkInput = document.querySelector('#photo-link_input');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


let cardTemplate = document.querySelector('#card-template');

let cardContainer = document.querySelector('.elements');

let popupPhoto = document.querySelector('.popup-photo');

//let deleteButton = cardTemplate.content.querySelector('.elements__delete-button');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


  function createNewCard(name,link){

    let newCard = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
    let deleteButton = newCard.querySelector('.elements__delete-button');
    let photoLikeButton = newCard.querySelector('.elements__like-button');
    let cardPopup = newCard.querySelector('.elements__popup-button');

    cardPopup.addEventListener("click", function(event){


      popupPhoto.querySelector('.popup__photo').src=link;
      popupPhoto.querySelector('.popup__photo-title').textContent=name;
      popupPhoto.classList.remove('popup-photo');/*В данном случае, почему-то недостаточно просто добавить модификатор _is-opened*/
      popupPhoto.classList.add('popup_is-opened');

      popupPhoto.querySelector('.popup__close_photo').addEventListener("click", function(event){
        popupPhoto.classList.add('popup-photo');
        popupPhoto.classList.remove('popup_is-opened');
      })
  });

    photoLikeButton.addEventListener("click", function(event){
      photoLikeButton.classList.toggle('elements__like-button_active');
  });

    deleteButton.addEventListener("click", function(event){
        event.target.closest('.elements__item').remove();
    });

    newCard.querySelector('.elements__title').textContent = name;
    newCard.querySelector('.elements__photo').src = link;

    return newCard;
  }

  for(let i = 0; i < initialCards.length; i += 1){
        let currentItem = initialCards[i];
        cardContainer.append(createNewCard(currentItem.name, currentItem.link));
  }



function openPopupEdit(evt){
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    popupEdit.classList.add('popup_is-opened');
}

function closePopupEdit(evt){
    popupEdit.classList.remove('popup_is-opened');
}


function openPopupAdd(evt){
    popupAdd.classList.add('popup_is-opened');
}


function closePopupAdd(evt){
    popupAdd.classList.remove('popup_is-opened');
}

function submitFormHandlerEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopupEdit();
}


function submitFormHandlerAdd (evt) {
    evt.preventDefault();
    
    //initialCards.unshift({name:photoNameInput.value, link:photoLinkInput});
    cardContainer.prepend(createNewCard(photoNameInput.value,photoLinkInput.value));
    closePopupAdd();
}



openPopupButtonEdit.addEventListener("click", openPopupEdit);

openPopupButtonAdd.addEventListener("click", openPopupAdd);

closePopupAddButton.addEventListener("click", closePopupAdd);

closePopupEditButton.addEventListener("click", closePopupEdit);

formEditElement.addEventListener('submit', submitFormHandlerEdit); 

formAddElement.addEventListener('submit', submitFormHandlerAdd); 
