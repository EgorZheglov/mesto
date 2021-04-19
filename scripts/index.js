const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name-input');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__profession-input');// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


nameInput.textContent = profileName.value;
jobInput.textContent = profileProfession.value;


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