const popup = document.querySelector(".popup");
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

const cardTemplate = document.querySelector("#card-template");

const cardContainer = document.querySelector(".elements");

const popupPhoto = document.querySelector(".popup_type_photo");


function createNewCard(name, link) {
  const newCard = cardTemplate.content
    .querySelector(".elements__item")
    .cloneNode(true);
  const deleteButton = newCard.querySelector(".elements__delete-button");
  const photoLikeButton = newCard.querySelector(".elements__like-button");
  const cardPopup = newCard.querySelector(".elements__popup-button");

  cardPopup.addEventListener("click", function (event) {
    openPopup(popupPhoto);
    popupPhoto.querySelector(".popup__photo").src = link;
    popupPhoto.querySelector(".popup__photo").alt = name + "";
    popupPhoto.querySelector(".popup__photo-title").textContent = name;
  });
  photoLikeButton.addEventListener("click", function (event) {
    photoLikeButton.classList.toggle("elements__like-button_active");
  });
  deleteButton.addEventListener("click", function (event) {
    event.target.closest(".elements__item").remove();
  });
  newCard.querySelector(".elements__title").textContent = name;
  newCard.querySelector(".elements__photo").src = link;
  newCard.querySelector(".elements__photo").alt = name + "";

  return newCard;
}

for (let i = 0; i < initialCards.length; i += 1) {
  let currentItem = initialCards[i];
  cardContainer.append(createNewCard(currentItem.name, currentItem.link));
}


function closeByEsc(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.key==="Escape"){
    closePopup(popup); //Прошу прощения, все исправил. 
  }
}

function closeByOverlay(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if(evt.target.classList.contains('popup'))
  {
    closePopup(popup); 
  }
}

function openPopup(popup) {
  const formElement = popup.querySelector(".popup__form");
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) =>{
    hideInputError(formElement, inputElement, config);
        }
    );
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByOverlay);
}


function closePopup(popup) {
  document.removeEventListener("keydown", closeByEsc);
  //В devtools не очень понятно, удалился обработчик или нет. 
  //Если не переключать вкладку EventListeners после закрытия popup'a, то он остается.
  //А если переключить и вернуться то вроде его нет. Это единственный способ проверить наличие обработчика?
  popup.removeEventListener("mousedown", closeByOverlay);
  popup.classList.remove("popup_is-opened");
}



function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEdit);
}

function submitFormHandlerAdd(evt) {
  evt.preventDefault();
  formElement = evt.target;
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  cardContainer.prepend(
    createNewCard(photoNameInput.value, photoLinkInput.value)
  );
  
  
  closePopup(popupAdd);
  toggleButtonState(buttonElement, inputList, config); //Валидация после отдельного инпута
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
//Имеет ли смысл вынести объект в отдельный файл?

enableValidation(config);

openPopupButtonEdit.addEventListener("click", function (event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEdit);
});

openPopupButtonAdd.addEventListener("click", function (event) {
  formAddElement.reset();
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

