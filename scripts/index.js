import Card from './Card.js';
import { initialCards, config } from './constants.js';
import FormValidator from './FormValidator.js';

const aboutPopup = document.querySelector('.popup_name_profile');
const aboutForm = document.querySelector('.popup__form');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const nameTitle = document.querySelector('.profile__title');
const jobAbout = document.querySelector('.profile__about');
const nameInput = aboutPopup.querySelector('.popup__input_text_name');
const jobInput = aboutPopup.querySelector('.popup__input_text_job');
const profileAddButton = document.querySelector('.profile__add-button');
const arrayPopup = Array.from(document.querySelectorAll('.popup'));

// Константы попапа карточек
const cardPopup = document.querySelector('.popup_name_card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

// Константы зум попапа
const zoomPopup = document.querySelector('.popup_name_zoom');
const imageZoomPopup = document.querySelector('.popup__zoom-image');
const textZoomPopup = document.querySelector('.popup__text')
const zoomPopupCloseButton = zoomPopup.querySelector('.popup__close-button');

// Константы начальные карточки
const cardsContainer = document.querySelector('.photo-grid__items');

// Константы новых карточек
const formNewElement = document.querySelector('.popup__form_newcard');
const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');


// константы валидации
const validationAbout = new FormValidator(config, aboutForm);
validationAbout.enableValidation();

const validationCard = new FormValidator(config, cardForm);
validationCard.enableValidation();

//Функция создания карточки на основе класса
function createCard(item) {
  const card = new Card(item, '#photo-grid');
  const cardsTemplate = card.generateCard();
  return cardsTemplate
}

// Начальные карточки
function renderInitialCards() {
  initialCards.reverse().forEach(item => {
    const cardHtml = createCard(item);
    addCard(cardHtml);
  });
}

renderInitialCards()

// Функция добавления новой карточки
function addCard(card) {
  cardsContainer.prepend(card);
}

// Функция добавления данных новой карточки из инпутов
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const inputValue = {
    name: placeInput.value,
    link: linkInput.value
  };
  const newCard = createCard(inputValue);

  addCard(newCard);
  closePopup(cardPopup);
  cardForm.reset();
}

// Функция зума карточки
function zoomCard(name, link) {
  imageZoomPopup.src = link;
  imageZoomPopup.alt = name;
  textZoomPopup.textContent = name;
  openPopup(zoomPopup);
}

// Функция открытия попапа
function openPopup(item) {
  item.classList.add('popup_opend');
  document.addEventListener('keydown', closeEscPopup);
}

//Функция закрытия попапа
function closePopup(item) {
  item.classList.remove('popup_opend');
  document.removeEventListener('keydown', closeEscPopup);
}

// Функция для добавления информации в поля и закрытия попапа
function handleAboutFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobAbout.textContent = jobInput.value;
  closePopup(aboutPopup);
};

// Функция закрытия попапа кликом на оверлей
function closeOverlayPopups (arrPopup) {
  arrPopup.forEach((item) => {
    item.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closePopup(item)
      }
    })
  })
}

// Функция закрытия попапа по Esc
function closeEscPopup (event) {
  if (event.key === 'Escape') {
    const item = document.querySelector('.popup_opend');
    closePopup(item);
  }
}

// Слушатели
  closeOverlayPopups(arrayPopup);
profileEditButton.addEventListener("click", () => {
  openPopup(aboutPopup);
  nameInput.value = nameTitle.textContent
  jobInput.value = jobAbout.textContent
});

profileCloseButton.addEventListener("click", () => {
  closePopup(aboutPopup);
});

profileAddButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

zoomPopupCloseButton.addEventListener("click", () => {
  closePopup(zoomPopup);
});

aboutForm.addEventListener('submit', handleAboutFormSubmit);
formNewElement.addEventListener('submit', handleNewCardFormSubmit);

export { zoomCard };
