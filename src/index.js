import '../pages/index.css'; // webpack подключит css
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {config} from '../utils/utils.js';
import {initialCards} from '../scripts/initial-cards.js';
import Section from '../scripts/Section.js';
import {PopupWithForm}  from '../scripts/popupWithForm.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {UserInfo} from '../scripts/UserInfo.js';

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-button");
const formEditElement = document.querySelector(".popup__form_edit");
const formAddElement = document.querySelector(".popup__form_add");
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#profession_input");
const userData = new UserInfo('.profile__name','.profile__profession');

function addCard(cardName, cardLink){
  const card = new Card({
    name:cardName, 
    link:cardLink, 
    templateSelector:'#card-template', 
    handleCardClick:(link, src) => {
      photoPopup.openPopup(link, src)
      photoPopup.setEventListeners();
    }
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}


const cardList = new Section ({
  items:initialCards,
  renderer:(card) => {
    addCard(card.name, card.link);
  }},
    '.elements'
);

cardList.renderItems();

openPopupButtonEdit.addEventListener("click", function (event) {
  const [profileName, profileProfession] = userData.getUserInfo();
  nameInput.value = profileName;
  jobInput.value = profileProfession;
  formEditValidator.removeInputError();
  popupEdit.openPopup();
  popupEdit.setEventListeners();
});

openPopupButtonAdd.addEventListener('click', function (event) {
  formAddValidator.removeInputError();
  popupAdd.openPopup();
  popupAdd.setEventListeners();
});

const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_type_photo');

const popupAdd = new PopupWithForm({
  popupSelector:'.popup_type_add', 
  popupSubmitFunction:(inputValues) => {
      addCard(inputValues[0].value, inputValues[1].value);
      popupAdd.closePopup();
    }
  }
);

const popupEdit = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  popupSubmitFunction:(inputValues) => {
      inputValues = {nameInput, jobInput};
      userData.setUserInfo(nameInput.value,jobInput.value)
      popupEdit.closePopup();
    }
  }
);