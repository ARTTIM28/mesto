const aboutPopup = document.querySelector('.popup')
const aboutButton = document.querySelector('.profile__edit-button');
const aboutCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container')
let nameTitle = document.querySelector('.profile__title');
let jobAbout = document.querySelector('.profile__about');
let nameInput = aboutPopup.querySelector('.popup__text-name');
let jobInput = aboutPopup.querySelector('.popup__text-about');

aboutButton.addEventListener('click', () => {
  aboutPopup.classList.add('popup_opend');
  nameInput.value = nameTitle.textContent
  jobInput.value = jobAbout.textContent
})

aboutCloseButton.addEventListener('click', () => {
  aboutPopup.classList.remove('popup_opend');
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobAbout.textContent = jobInput.value;
  aboutPopup.classList.remove('popup_opend');
};

formElement.addEventListener('submit', handleFormSubmit);


