const aboutPopup = document.querySelector('.popup_name_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
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
const cardsTemplate = document.querySelector('#photo-grid').content;
const cardsContainer = document.querySelector('.photo-grid__items');
const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);

// Константы новых карточек
const formNewElement = document.querySelector('.popup__form_newcard');
const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');


function createCards({ name, link, alt }) {
  const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardText = card.querySelector('.photo-grid__text');
  cardText.textContent = name;
  const cardImage = card.querySelector('.photo-grid__photo');
  cardImage.src = link;
  cardImage.alt = alt;

  addCardEventListener(card, link, name, alt);

  return card;
}

function renderCards() {
  initialCards.reverse().forEach(item => {
    const cardHtml = createCards(item);
    addCard(cardHtml);
  });
}

renderCards()

// Функция добавления новой карточки
function addCard(card) {
  cardsContainer.prepend(card);
}

// Функция добавления данных новой карточки из инпутов
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCards({
    name: placeInput.value,
    link: linkInput.value
  });

  addCard(newCard);
  closePopup(cardPopup);

  placeInput.value = '';
  linkInput.value = '';
}

// Функция зума карточки
function zoomCard( name, link, alt ) {
  imageZoomPopup.src = link;
  imageZoomPopup.alt = alt;
  textZoomPopup.textContent = name;
  openPopup(zoomPopup);
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.photo-grid__item').remove();
}

//Функция лайка
function likeCard(item) {
  item.target.classList.toggle('photo-grid__element_active');
}

//Функция обработчика событий карточки
function addCardEventListener(card, link, name, alt) {
  const trashButton = card.querySelector('.photo-grid__trash');
  trashButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.photo-grid__element');
  likeButton.addEventListener('click', likeCard);

  const zoomImage = card.querySelector('.photo-grid__photo');
  zoomImage.addEventListener('click', () => zoomCard(name, link, alt));
}

// Функция открытия попапа
function openPopup(item) {
  item.classList.add('popup_opend');
  closeOverlayPopup(arrayPopup);
  document.addEventListener('keydown', closeEscPopup);
}

//Функция закрытия попапа
function closePopup(item) {
  item.classList.remove('popup_opend');
  document.removeEventListener('keydown', closeEscPopup);
}

// Функция для добавления информации в поля и закрытия попапа
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobAbout.textContent = jobInput.value;
  closePopup(aboutPopup);
};

// Функция закрытия попапа кликом на оверлей
function closeOverlayPopup (arrPopup) {
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

formElement.addEventListener('submit', handleFormSubmit);
formNewElement.addEventListener('submit', handleNewCardFormSubmit);


