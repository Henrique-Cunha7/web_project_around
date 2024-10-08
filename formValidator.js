import { isValidURL } from "./utils.js";

export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    const inputList = this._getInputListFromForm();
    const submitButton = this._getSubmitButtonFromForm();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, inputList);
      });
    });
  }

  // Função para obter a lista de inputs do formulário
  _getInputListFromForm() {
    return Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
  }

  // Função para obter o botão de submit do formulário
  _getSubmitButtonFromForm() {
    return this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Função que verifica se há algum input inválido
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Função para alterar o estado do botão de submit entre ativo/desativado
  _toggleButtonState(button, inputList) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.remove(this._config.activeButtonClass);
      button.disabled = true;
    } else {
      button.classList.add(this._config.activeButtonClass);
      button.disabled = false;
    }
  }

  // Função que valida um input do tipo texto e retorna uma mensagem de erro se for inválido ou `null` se for válido
  _validateTextInput(input) {
    const minLength = parseInt(input.getAttribute("minlength"), 10);
    const maxLength = parseInt(input.getAttribute("maxlength"), 10);
    const value = input.value.trim();

    if (value.length < minLength) {
      return `Deve ter pelo menos ${minLength} caracteres.`;
    } else if (value.length > maxLength) {
      return `Deve ter no máximo ${maxLength} caracteres.`;
    } else {
      return null;
    }
  }

  // Função que valida um input do tipo URL e retorna uma mensagem de erro se for inválido ou `null` se for válido
  _validateUrlInput(input) {
    return isValidURL(input.value) ? null : "URL inválida.";
  }

  // Função para alternar o estado da mensagem de erro que fica em baixo do input
  _toggleInputErrorMessage(input, error) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (error) {
      errorElement.textContent = error;
      errorElement.classList.add(this._config.errorClass);
      errorElement.style.display = "block"; // Força a visibilidade
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
      errorElement.style.display = "none"; // Garante que esconda
    }
  }

  // Função que verifica se o input tem algum erro e utiliza esses dados para alternar o estado da mensagem de erro
  _checkInputValidity(input) {
    switch (input.type) {
      case "text": {
        const errorMessage = this._validateTextInput(input);
        this._toggleInputErrorMessage(input, errorMessage);
        break;
      }
      case "url": {
        const errorMessage = this._validateUrlInput(input);
        this._toggleInputErrorMessage(input, errorMessage);
        break;
      }
    }
  }
}
