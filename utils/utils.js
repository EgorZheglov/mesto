const popupPhoto = document.querySelector('.popup_type_photo');

function closeByEsc(evt) {
    const popup = document.querySelector(".popup_is-opened");
    if (evt.key==="Escape"){
      closePopup(popup);
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
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEsc);
    popup.addEventListener("mousedown", closeByOverlay);
  }

function closePopup(popup) {
    document.removeEventListener("keydown", closeByEsc);
    popup.removeEventListener("mousedown", closeByOverlay);
    popup.classList.remove("popup_is-opened");
  }

export {openPopup, closeByEsc, closeByOverlay, popupPhoto, closePopup} 