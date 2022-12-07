export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig; //объект
    this._form = form; //форма
    this._inputCollection = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    ); //input
    this._submitButtonElement = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    ); //кнопка
    this._formCollection = Array.from(
      document.querySelectorAll(this._validationConfig.form)
    ); //forms
  }
  // показывает ошибку
  _showInputError = (inputSelector, errorMessage) => {
    const errorItem = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.parentNode.classList.add(this._validationConfig.errorClass);
    errorItem.textContent = errorMessage;
  };
  //скрывает ошибку
  _hideInputError = (inputSelector) => {
    const errorItem = this._form.querySelector(`.${inputSelector.id}-error`);
    inputSelector.parentNode.classList.remove(this._validationConfig.errorClass);
    errorItem.textContent = '';
  };

  _showSuccessMessage = (inputSelector) => {
    inputSelector.parentNode.classList.add(this._validationConfig.successClass);
  };

  _hideSuccessMessage = (inputSelector) => {
    inputSelector.parentNode.classList.remove(this._validationConfig.successClass);
  };

  //проверяет есть ли ошибка
  _isValid = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
      this._hideSuccessMessage(inputSelector)
    } else {
      this._hideInputError(inputSelector);
      this._showSuccessMessage(inputSelector);
    }
  };
  //кнопка
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputCollection)) {
      this.disabledButton();
    } else {
      this._submitButtonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonElement.removeAttribute('disabled', 'disabled');
    }
  };
  _hasInvalidInput = () => {
    return this._inputCollection.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  _showTelegramInput() {
    this._telegramInput.classList.remove(this._validationConfig.hideInputSelector);
    this._phoneInput.classList.add(this._validationConfig.hideInputSelector);

    this._telegramInput.querySelector('input').setAttribute('required', 'required');
    this._phoneInput.querySelector('input').removeAttribute('required', 'required')
  }

  _showPhoneInput() {
    this._phoneInput.classList.remove(this._validationConfig.hideInputSelector);
    this._telegramInput.classList.add(this._validationConfig.hideInputSelector);

    this._phoneInput.querySelector('input').setAttribute('required', 'required');
    this._telegramInput.querySelector('input').removeAttribute('required', 'required')
  }

  _setContactsSectionListeners() {
    this._phoneRadio = this._form.querySelector(this._validationConfig.phoneRadio);
    this._telegramRadio = this._form.querySelector(this._validationConfig.telegramRadio);

    this._phoneInput = this._form.querySelector(this._validationConfig.phoneInput);
    this._telegramInput = this._form.querySelector(this._validationConfig.telegramInput);

    this._phoneRadio.addEventListener('change', () => {
      this._showPhoneInput();
    })
    this._telegramRadio.addEventListener('change', () => {
      this._showTelegramInput();
    })
  }

  //слушатель
  _setEventListener = () => {
    this._toggleButtonState(); //button
    this._inputCollection.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._isValid(inputSelector);
        this._toggleButtonState(); //button
      });
    });

    if(this._form.classList.contains(this._validationConfig.tellUsFormSelector)) {
      this._setContactsSectionListeners();
    }
  };
  enableValidation = () => {
    this._setEventListener();
  };
  disabledButton = () => {
    this._submitButtonElement.setAttribute('disabled', 'disabled');
    this._submitButtonElement.classList.add(
      this._validationConfig.inactiveButtonClass
    );
  };
  // очистка от ошибок
  resetInputs = () => {
    this._toggleButtonState();
    this._inputCollection.forEach((inputSelector) => {
      this._hideInputError(inputSelector);
      this._hideSuccessMessage(inputSelector);
    });
  };

}
