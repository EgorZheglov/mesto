import FormValidator from './FormValidator.js';
import Card from './card.js';
import {openPopup, closeByEsc, closeByOverlay, popupPhoto, closePopup} from '../utils/utils.js';

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
const formEditValidator = new FormValidator(config, formEditElement);
const formAddElement = document.querySelector(".popup__form_add");
const formAddValidator = new FormValidator(config, formAddElement);
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
  const cardPopup = cardElement.querySelector(".elements__popup-button");
  cardContainer.prepend(cardElement);

  cardPopup.addEventListener("click", function (event) {
    openPopup(popupPhoto);
    popupPhoto.querySelector(".popup__photo").src = cardLink;
    popupPhoto.querySelector(".popup__photo").alt = cardName + "";
    popupPhoto.querySelector(".popup__photo-title").textContent = cardName;
  });
}

for (let i = 0; i < initialCards.length; i += 1) {
  let currentItem = initialCards[i];
  addCard(currentItem.name, currentItem.link);
}


function removeInputError(popup, validator){
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) =>{
     validator.hideInputError(inputElement);
    }
  );
}

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
  removeInputError(popupEdit,formEditValidator);
  openPopup(popupEdit);
  formEditValidator.enableValidation();
});

openPopupButtonAdd.addEventListener("click", function (event) {
  formAddElement.reset();
  formAddValidator.enableValidation();
  removeInputError(popupAdd,formAddValidator);
  openPopup(popupAdd);
});

closePopupAddButton.addEventListener("click", function (event) {
  closePopup(popupAdd);
});


closePopupEditButton.addEventListener("click", function (event) {
  formEditValidator.enableValidation();
  closePopup(popupEdit);
});


closePopupPhotoButton.addEventListener("click", function (event) {
    closePopup(popupPhoto);
  });



formEditElement.addEventListener("submit", submitFormHandlerEdit);


formAddElement.addEventListener("submit", submitFormHandlerAdd);

//Заранее благодарю за ревью и прошу прощения за недочеты. Эта тема дается особенно тяжело.