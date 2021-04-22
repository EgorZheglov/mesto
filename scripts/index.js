let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#name_input');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#profession_input');// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


function openPopup(event){
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    //Долго не мог понять: почему nameInput.value работает в данном случае, а nameInput.textContent - нет.
    //Притом, что когда Попап открывается всторой раз за сессию - все работало ОК. Помог только метод научного тыка ;)
    popup.classList.add('popup_is-opened');
}

function closePopup(event){
    popup.classList.remove('popup_is-opened');
}
//разделить так?

function submitFormHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}

openPopupButton.addEventListener("click", openPopup);

closePopupButton.addEventListener("click", closePopup);

formElement.addEventListener('submit', submitFormHandler); 

//Не очень понятно, было ли необходимо, чтобы при первом открытии форма уже была заполнена.
// По крайней мере сейчас изменения сохраняются после ввода.