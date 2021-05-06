const popup = document.querySelector('.popup');
const openPopupButtonEdit = document.querySelector('.profile__edit-button');
const openPopupButtonAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupAddButton = document.querySelector('.popup__close_add');
const closePopupEditButton = document.querySelector('.popup__close_edit');
const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('#name_input');
const jobInput = document.querySelector('#profession_input');
const photoNameInput = document.querySelector('#photo-name_input');
const photoLinkInput = document.querySelector('#photo-link_input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');


const cardTemplate = document.querySelector('#card-template');

const cardContainer = document.querySelector('.elements');

const popupPhoto = document.querySelector('.popup_type_photo');


//Странно, что при изменении атрибута переменной, которая объявлена константой вроде 
//textContent или value - не возникает ошибки и все работает. Получается, атрибуты const не являются постоянными? 

  function createNewCard(name,link){

    let newCard = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
    let deleteButton = newCard.querySelector('.elements__delete-button');
    let photoLikeButton = newCard.querySelector('.elements__like-button');
    let cardPopup = newCard.querySelector('.elements__popup-button');

    cardPopup.addEventListener("click", function(event){
      openPopup(popupPhoto);
      popupPhoto.querySelector('.popup__photo').src=link;
      popupPhoto.querySelector('.popup__photo').alt = name + '';
      popupPhoto.querySelector('.popup__photo-title').textContent = name;
  });
    photoLikeButton.addEventListener('click', function(event){
      photoLikeButton.classList.toggle('elements__like-button_active');
  });
    deleteButton.addEventListener('click', function(event){
        event.target.closest('.elements__item').remove();
    });
    newCard.querySelector('.elements__title').textContent = name;
    newCard.querySelector('.elements__photo').src = link;
    newCard.querySelector('.elements__photo').alt= name + '';

    return newCard;
  }

  console.log(popupPhoto.querySelector('.popup__photo').alt);

  for(let i = 0; i < initialCards.length; i += 1){
        let currentItem = initialCards[i];
        cardContainer.append(createNewCard(currentItem.name, currentItem.link));
  }


function openPopup(popup){
  popup.classList.add('popup_is-opened');
}

function closePopup(popup){
    popup.classList.remove('popup_is-opened');
}

function submitFormHandlerEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupEdit);;
}

function submitFormHandlerAdd (evt) {
    evt.preventDefault();  
    //initialCards.unshift({name:photoNameInput.value, link:photoLinkInput});
    cardContainer.prepend(createNewCard(photoNameInput.value,photoLinkInput.value));
    formAddElement.reset();
    closePopup(popupAdd);
}

openPopupButtonEdit.addEventListener('click', function (event){
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEdit);
});

openPopupButtonAdd.addEventListener('click', function (event){
  openPopup(popupAdd);
});

closePopupAddButton.addEventListener('click', function (event){
  closePopup(popupAdd);
});

closePopupEditButton.addEventListener('click', function (event){
  closePopup(popupEdit);
});

popupPhoto.querySelector('.popup__close_photo').addEventListener("click", function(event){
  closePopup(popupPhoto);
});

formEditElement.addEventListener('submit', submitFormHandlerEdit); 

formAddElement.addEventListener('submit', submitFormHandlerAdd); 
