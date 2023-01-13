const aboutPopup = document.querySelector('.popup_name_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameTitle = document.querySelector('.profile__title');
const jobAbout = document.querySelector('.profile__about');
const nameInput = aboutPopup.querySelector('.popup__input_text_name');
const jobInput = aboutPopup.querySelector('.popup__input_text_job');

const profileAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_name_card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

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

// Добавить начальные карточки
const cardsTemplate = document.querySelector('#photo-grid').content;
const cardsContainer = document.querySelector('.photo-grid__items');
const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);

function createCards({ name, link }) {
  const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardText = card.querySelector('.photo-grid__text');
  cardText.textContent = name;
  const cardImage = card.querySelector('.photo-grid__photo');
  cardImage.src = link;

  return card;
}

function renderCards() {
  initialCards.reverse().forEach(item => {
    const cardHtml = createCards(item);
    addCard(cardHtml);
  });
}

renderCards()

// Добавить новую карточку

const formNewElement = document.querySelector('.popup__form_newcard');
const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');

// Функция добавления новой карточки
function addCard(card) {
  cardsContainer.prepend(card);
}

// Функция добавления данных новой карточки из инпутов
function newCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCards({
    name: placeInput.value,
    link: linkInput.value
  });

  addCard(newCard);
  closePopup(cardPopup);
}



// Функция открытия попапа 
function openPopup(item) {
  item.classList.add('popup_opend');
}

//Функция закрытия попапа
function closePopup(item) {
  item.classList.remove('popup_opend');
}

// Функция для добавления информации в поля и закрытия попапа
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobAbout.textContent = jobInput.value;
  closePopup(aboutPopup);
};

// Слушатели

profileEditButton.addEventListener("click", () => {
  openPopup(aboutPopup);
  nameInput.value = nameTitle.textContent
  jobInput.value = jobAbout.textContent
});

profileCloseButton.addEventListener("click", () => {
  closePopup(aboutPopup);
});

formElement.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

formNewElement.addEventListener('submit', newCardFormSubmit);


