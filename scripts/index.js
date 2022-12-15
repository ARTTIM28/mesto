const aboutPopup = document.querySelector('.popup')
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form')
const nameTitle = document.querySelector('.profile__title');
const jobAbout = document.querySelector('.profile__about');
const nameInput = aboutPopup.querySelector('.popup__input_text_name');
const jobInput = aboutPopup.querySelector('.popup__input_text_job');


function openPopup() {
  aboutPopup.classList.add('popup_opend');
  nameInput.value = nameTitle.textContent
  jobInput.value = jobAbout.textContent
}

function closePopup() {
  aboutPopup.classList.remove('popup_opend');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobAbout.textContent = jobInput.value;
  closePopup ();
};

profileEditButton.addEventListener("click", openPopup);
profileCloseButton.addEventListener("click", closePopup);
formElement.addEventListener('submit', handleFormSubmit);


