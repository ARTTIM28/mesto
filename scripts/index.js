const aboutPopup = document.querySelector('.popup_name_profile');
const aboutForm = aboutPopup.querySelector('.popup__form');
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
const cardsTemplate = document.querySelector('#photo-grid').content;
const cardsContainer = document.querySelector('.photo-grid__items');
const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);

// Константы новых карточек
const formNewElement = document.querySelector('.popup__form_newcard');
const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');


function createCard(item) {
  const card = cardsTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardText = card.querySelector('.photo-grid__text');
  cardText.textContent = item.name;
  const cardImage = card.querySelector('.photo-grid__photo');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  addCardEventListeners(card, item);

  return card;
}

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
function zoomCard(item) {
  imageZoomPopup.src = item.link;
  imageZoomPopup.alt = item.name;
  textZoomPopup.textContent = item.name;
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
function addCardEventListeners(card, item) {
  const trashButton = card.querySelector('.photo-grid__trash');
  trashButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.photo-grid__element');
  likeButton.addEventListener('click', likeCard);

  const zoomImage = card.querySelector('.photo-grid__photo');
  zoomImage.addEventListener('click', () => zoomCard(item));
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
