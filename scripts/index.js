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


nameInput.textContent = profileName.value;
jobInput.textContent = profileProfession.value;



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
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popup.classList.toggle('popup_is-opened');
}

openPopupButton.addEventListener("click", togglePopup);

closePopupButton.addEventListener("click", togglePopup);

formElement.addEventListener('submit', formSubmitHandler); 

//Не очень понятно, было ли необходимо, чтобы при первом открытии форма уже была заполнена.
// По крайней мере сейчас изменения сохраняются после ввода.