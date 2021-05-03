<<<<<<< HEAD
const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()

let elementsContainer = document.querySelector('.elements');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name-input');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__profession-input');// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let cardTemplate = document.querySelector('#card-template');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
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


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
=======
let openPopupButtonEdit = document.querySelector('.profile__edit-button');
let openPopupButtonAdd = document.querySelector('.profile__add-button');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup-add');
let closePopupAddButton = document.querySelector('.popup__close_add');
let closePopupEditButton = document.querySelector('.popup__close_edit');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name_input');
let jobInput = document.querySelector('#profession_input');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

>>>>>>> main

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

<<<<<<< HEAD

for (let i = 0; i < initialCards.length; i+=1)
{
    let currentItem = initialCards[i];
    
    let newCard = cardTemplate.content.cloneNode(true);
   
    newCard.querySelector('.elements__title').textContent = currentItem.name;
 
    elementsContainer.append(newCard);
}

function togglePopup(event){
    event.preventDefault();
    popup.classList.toggle('popup_is-opened');
=======
function closePopupAdd(evt){
    popupAdd.classList.remove('popup_is-opened');
>>>>>>> main
}

function submitFormHandler (evt) {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}

openPopupButtonEdit.addEventListener("click", openPopupEdit);

openPopupButtonAdd.addEventListener("click", openPopupAdd);

closePopupAddButton.addEventListener("click", closePopupAdd);

closePopupEditButton.addEventListener("click", closePopupEdit);

formElement.addEventListener('submit', submitFormHandler); 

