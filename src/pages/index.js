import './index.css'; // webpack подключит css 
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import {config} from '../utils/utils.js'; 
//import {initialCards} from '../utils/initial-cards.js'; 
import Section from '../components/Section.js'; 
import {PopupWithForm}  from '../components/PopupWithForm.js'; 
import {PopupWithImage} from '../components/PopupWithImage.js'; 
import {UserInfo} from '../components/UserInfo.js'; 
import Api from '../components/Api.js';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '2245779c-6198-47bc-8dae-135ddf28bc0e',
    'Content-Type': 'application/json'
  }
});

api.getUserData() //Отправляем запрос информацию о пользователе
.then(data => {
  userData.setUserInfo(data.name, data.about) //Полученный результат кладем в класс UserData
})
.catch((err) => { 
  console.log(`${err}`) 
})


api.getInitialCards() //Отправляем запрос карточек
.then(data => {
  console.log(data)
  cardList.renderItems(data); //Полученный массив отрисовывем с помощью CardList - экземпляра класса Section
})
.catch((err) => {
  console.log(err)
})

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-button");
const formEditElement = document.querySelector(".popup__form_edit");
const formAddElement = document.querySelector(".popup__form_add");
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#profession_input");
const userData = new UserInfo('.profile__name','.profile__profession');

function createCard(cardName, cardLink, likes, id){

  const card = new Card({
    name:cardName, 
    link:cardLink, 
    likeQuantity:likes,
    id:id,
    templateSelector:'#card-template', 
    handleCardClick:(link, src) => {
      photoPopup.openPopup(link, src)
    },
    putLikeFunc:(cardId) => {
     api.putLike(cardId)
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log('zhopa')
      })
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}


const cardList = new Section ({
  renderer:(card) => {
    cardList.addItem(createCard(card.name, card.link, card.likes.length, card._id));
  }},
    '.elements'
);



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
  popupSubmitFunction:({photoNameInput, photoLinkInput}) => {
      api.sendCardInfo(photoNameInput, photoLinkInput)//Отправляем карточку на сервер
      .then(res =>{//получаем ее id
        cardList.addItem(createCard(photoNameInput, photoLinkInput, 0, res._id));
      })
      popupAdd.closePopup();
    }
  }
);

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  popupSubmitFunction: ({nameInput, professionInput}) => {
      userData.setUserInfo(nameInput, professionInput)
      api.sendUserData(nameInput, professionInput)
      popupEdit.closePopup();
    }
  }
);

popupEdit.setEventListeners();




