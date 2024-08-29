// validation.js

// Função para mostrar mensagem de erro
const showError = (inputElement, errorMessage, config) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Função para esconder mensagem de erro
const hideError = (inputElement, config) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

// Função para verificar se um input é válido
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, config);
  } else {
    hideError(inputElement, config);
  }
};

// Função para verificar se todos os inputs são válidos
const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => !inputElement.validity.valid);
};

// Função para ativar/desativar o botão de submit
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Função para adicionar os eventos de validação a um formulário
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Função para ativar a validação em todos os formulários
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

// Exporta a função para ser usada em outros arquivos
export { enableValidation };
