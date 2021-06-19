import './index.css'; // webpack подключит css 
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import {config} from '../utils/utils.js'; 
import {initialCards} from '../utils/initial-cards.js'; 
import Section from '../components/Section.js'; 
import {PopupWithForm}  from '../components/PopupWithForm.js'; 
import {PopupWithImage} from '../components/PopupWithImage.js'; 
import {UserInfo} from '../components/UserInfo.js'; 


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
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}


const cardList = new Section ({
  items:initialCards,
  renderer:(card) => {
    const newCard = addCard(card.name, card.link);
    cardList.addItem(newCard);
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
});

openPopupButtonAdd.addEventListener('click', function (event) {
  formAddValidator.removeInputError();
  popupAdd.openPopup();
});

const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_type_photo');
photoPopup.setEventListeners();

const popupAdd = new PopupWithForm({
  popupSelector:'.popup_type_add', 
  popupSubmitFunction:({photonameinput, photolinkinput}) => {
      const newCard = addCard(photonameinput, photolinkinput);
      cardList.addItem(newCard);
      popupAdd.closePopup();
    }
  }
);

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  popupSubmitFunction: ({nameinput, professioninput}) => {
      userData.setUserInfo(nameinput, professioninput)
      popupEdit.closePopup();
    }
  }
);

popupEdit.setEventListeners();

//Еще раз большое спасибо за ревью! 
//Извините, если что-то не заметил.