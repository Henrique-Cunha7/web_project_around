// validation.js

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Função para mostrar mensagem de erro
  _showError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message');
    errorElement.style.display = 'block'; // Força a visibilidade, se necessário
  }

  // Função para esconder mensagem de erro
  _hideError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('error-message');
    errorElement.style.display = 'none'; // Garante que esconda
  }

  // Função para verificar se um input é válido
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  // Função para verificar se todos os inputs são válidos
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Função para ativar/desativar o botão de submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true; // Desativa o botão
    } else {
      this._buttonElement.disabled = false; // Ativa o botão
    }
  }

  // Função para adicionar os eventos de validação a um formulário
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Função para ativar a validação
  enable() {
    this._setEventListeners();
  }
}

// Configuração para o botão de adicionar post
const addPostValidationConfig = {
  formSelector: '#add-post-form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button_type_add-post',
  activeButtonClass: 'pop-up__button_type_add-post-active',
  errorClass: 'error-message' // Classe de erro para mensagens
};

// Função para ativar a validação em todos os formulários
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enable();
  });
};

// Exporta a função para ser usada em outros arquivos
export { enableValidation };
