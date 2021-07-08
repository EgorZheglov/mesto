import './index.css'; // webpack подключит css 
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import {config} from '../utils/utils.js'; 
import Section from '../components/Section.js'; 
import {PopupWithForm}  from '../components/PopupWithForm.js'; 
import {PopupWithImage} from '../components/PopupWithImage.js'; 
import {UserInfo} from '../components/UserInfo.js'; 
import Api from '../components/Api.js';
import { ConfimPopup } from '../components/ConfirmPopup.js';

let userId; //Объявляем переменную, в которую при первой возможности запишем id

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '2245779c-6198-47bc-8dae-135ddf28bc0e',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getUserData(), api.getInitialCards()]) //Получаем начальные данные
.then(([userInfo, initialCards]) => {
  userId = userInfo._id;
  
  userData.setUserInfo(userInfo.name, userInfo.about)
  userData.setUserAvatar(userInfo.avatar)
  
  cardList.renderItems(initialCards)
})
.catch((err) => { 
    console.log(`Ошибка загрузки начальных данных: ${err}`) 
})


const openPopupButtonAvatar = document.querySelector('.profile__avatar-button');
const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-button");
const formEditElement = document.querySelector(".popup__form_edit");
const formAddElement = document.querySelector(".popup__form_add");
const formAvatarChangeElement = document.querySelector('.popup__form_avatar');
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#profession_input");
const userData = new UserInfo('.profile__name','.profile__profession','.profile__img');

function createCard(cardName, cardLink, likes, cardId, owner){
  const card = new Card({
    name:cardName, 
    link:cardLink, 
    likesArray:likes,
    cardId:cardId,
    cardOwner:owner,
    userId:userId,
    templateSelector:'#card-template', 
    handleCardClick:(link, src) => {
      photoPopup.openPopup(link, src)
    },
    toggleLikeFunc:(cardId, method) => {  //Отправляем запрос о постановке/снятии лайка
     api.toggleLike(cardId, method)
     .then(res => {
        card.updateLikes(res.likes)
    })
     .catch(err => {
       console.log(`${err}`)
      })
    },
    handleDeleteClick:(id) => {
      popupDelete.openPopup();
      popupDelete.setConfirmHandler(() => { //передаем в класс confirmPopup функцию которая удаляет Данные с сервера(через класс API) и из клиета (Через класс Card)                  
        api.deleteCard(id)                  
        .then(() =>{
          card.deleteButtonClick(); 
          popupDelete.closePopup();
        })
        .catch(err => {
          console.log(`ошибка ${err}`)
        })
      });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}


const cardList = new Section ({
  renderer:(card) => {
    cardList.addItem(createCard(card.name, card.link, card.likes, card._id, card.owner));
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

openPopupButtonAvatar.addEventListener('click', function (event){
  formAvatarValidator.removeInputError();
  popupAvatar.openPopup();
})


const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(config, formAvatarChangeElement);
formAvatarValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_type_photo');
photoPopup.setEventListeners();

const popupAdd = new PopupWithForm({
  popupSelector:'.popup_type_add', 
  popupSubmitFunction:({photoNameInput, photoLinkInput}) => {
      api.sendCardInfo(photoNameInput, photoLinkInput)//Отправляем карточку на сервер
      .then(res =>{//получаем ее id
        cardList.addItem(createCard(photoNameInput, photoLinkInput, [], res._id, res.owner));
        popupAdd.closePopup();
      })
      .catch((err) => { 
        console.log(`ошибка:${err}`) 
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      })
    }
  }
);

popupAdd.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector:'.popup_type_avatar', 
  popupSubmitFunction:(inputValue) => {
      api.sendUserAvatar(inputValue.avatarLinkInput)
      .then(() =>{
        userData.setUserAvatar(inputValue.avatarLinkInput); 
        popupAvatar.closePopup() 
      })
      .catch((err) => { 
        console.log(`ошибка:${err}`) 
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
    }
  }
);
popupAvatar.setEventListeners();

const popupDelete = new ConfimPopup('.popup_type_delete');
popupDelete.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  popupSubmitFunction: ({nameInput, professionInput}) => {
      api.sendUserData(nameInput, professionInput)
      .then(()=>{
        userData.setUserInfo(nameInput, professionInput)
        popupEdit.closePopup();
      })
      .catch((err) => { 
        console.log(`ошибка:${err}`) 
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      })
    }
  }
);

popupEdit.setEventListeners();



//Большое спасибо еще раз!


