const aboutPopup = document.querySelector('.popup')
const profileEditButton = document.querySelector('.profile__edit-button');
const aboutCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form')
const nameTitle = document.querySelector('.profile__title');
const jobAbout = document.querySelector('.profile__about');
const nameInput = aboutPopup.querySelector('.popup__input_text_name');
const jobInput = aboutPopup.querySelector('.popup__input_text_job');

profileEditButton.addEventListener('click', () => {
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
  aboutCloseButton();
};

formElement.addEventListener('submit', formElement);


