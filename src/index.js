import '../pages/index.css'; // webpack подключит css
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {config} from '../utils/utils.js';
import {initialCards} from '../scripts/initial-cards.js';
import Section from '../scripts/Section.js';
import {PopupWithForm}  from '../scripts/popupWithForm.js';



const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-button");
const formEditElement = document.querySelector(".popup__form_edit");
const formAddElement = document.querySelector(".popup__form_add");
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#profession_input");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");




function addCard(cardName, cardLink){
  const card = new Card(cardName, cardLink, '#card-template');
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
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
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

const popupAdd = new PopupWithForm({
  popupSelector:'.popup_type_add', 
  popupSubmitFunction:(inputValues) => {
      formAddValidator.removeInputError();
      addCard(inputValues[0].value, inputValues[1].value)
      popupAdd.closePopup();
    }
  }
);

const popupEdit = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  popupSubmitFunction:(inputValues) => {
      inputValues = {nameInput, jobInput};
      profileName.textContent = nameInput.value;
      profileProfession.textContent = jobInput.value;
      popupEdit.closePopup();
    }
  }
);