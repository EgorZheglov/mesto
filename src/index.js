import '../pages/index.css'; // webpack подключит css
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {openPopup, popupPhoto, closePopup} from '../utils/utils.js';
import {initialCards} from '../scripts/initial-cards.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const closePopupAddButton = document.querySelector(".popup__close_add");
const closePopupEditButton = document.querySelector(".popup__close_edit");
const closePopupPhotoButton = document.querySelector(".popup__close_photo");
const formEditElement = document.querySelector(".popup__form_edit");
const formAddElement = document.querySelector(".popup__form_add");
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#profession_input");
const photoNameInput = document.querySelector("#photo-name_input");
const photoLinkInput = document.querySelector("#photo-link_input");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const cardContainer = document.querySelector(".elements");


function addCard(cardName, cardLink){
  const card = new Card(cardName, cardLink, '#card-template');
  const cardElement = card.createCard();
  cardContainer.prepend(cardElement);
}


initialCards.forEach((initialCard)=>{
  addCard(initialCard.name, initialCard.link);
})

function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEdit);
}

function submitFormHandlerAdd(evt) {
  evt.preventDefault();
  addCard(photoNameInput.value, photoLinkInput.value,);
  closePopup(popupAdd);
}

openPopupButtonEdit.addEventListener("click", function (event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  formEditValidator.removeInputError();
  openPopup(popupEdit);
});

openPopupButtonAdd.addEventListener("click", function (event) {
  formAddElement.reset();
  formAddValidator.removeInputError();//Вызвал toggleButtonState внутри этого метода в card.js.
  openPopup(popupAdd);
});

closePopupAddButton.addEventListener("click", function (event) {
  closePopup(popupAdd);
});


closePopupEditButton.addEventListener("click", function (event) {
  closePopup(popupEdit);
});


closePopupPhotoButton.addEventListener("click", function (event) {
    closePopup(popupPhoto);
  });


formEditElement.addEventListener("submit", submitFormHandlerEdit);


formAddElement.addEventListener("submit", submitFormHandlerAdd);

const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

//Спасибо большое еще раз!
//Прошу прощения, если что-то не заметил.