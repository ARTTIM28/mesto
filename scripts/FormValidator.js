class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  //показывает ошибки
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  //скрывает ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  //проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //принимает массив полей
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Блокировать кнопку отправки
  _disableSubmitButton() {
    this.buttonElement.classList.add(this._config.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  }

  //Сделать активной кнопку отправки
  _enableSubmitButton() {
    this.buttonElement.classList.remove(this._config.inactiveButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  //добать класс кнопке
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton()
    } else {
      this._enableSubmitButton()
    }
  }

  // Функция добавит обработчики сразу всем полям формы
  _setEventListeners() {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  //  Функция добавления валидации для форм
  enableValidation() {
    this._formElement.addEventListener('submit', () => {
      this._disableSubmitButton();
    });
    this._setEventListeners();
  };
}

export default FormValidator;

