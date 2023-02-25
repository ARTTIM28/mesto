import { zoomCard } from './index.js';

class Card {
  constructor(item, templateSelector, zoomCard) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._zoomCard = zoomCard;
  }

      // Константы начальные карточки
  _getTemplate() {
    const cardsTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-grid__item")
      .cloneNode(true);

  return cardsTemplate;
  }

    //метод лайка
    _likeCard() {
      this._likeButton.classList.toggle('photo-grid__element_active');
      }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardText = this._element.querySelector(".photo-grid__text");
    this._cardImage = this._element.querySelector(".photo-grid__photo");
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  //Слушатели корзины лайка и зума картинки
  _setEventListeners() {
    this._trashButton = this._element.querySelector('.photo-grid__trash');
    this._trashButton.addEventListener('click', () => {
      this._element.remove();
    });

    this._likeButton = this._element.querySelector('.photo-grid__element');
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._zoomImage = this._element.querySelector('.photo-grid__photo');
    this._zoomImage.addEventListener('click', () => {
      zoomCard(this._name, this._link);
    });
  }
}

export default Card;
