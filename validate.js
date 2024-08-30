// validation.js

// Função para mostrar mensagem de erro
const showError = (inputElement, errorMessage, config) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  errorElement.style.display = 'block'; // Força a visibilidade, se necessário
};

// Função para esconder mensagem de erro
const hideError = (inputElement, config) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  errorElement.style.display = 'none'; // Garante que esconda
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
    buttonElement.classList.remove(config.activeButtonClass); // Remove a classe ativa
    buttonElement.disabled = true; // Desativa o botão
  } else {
    buttonElement.classList.add(config.activeButtonClass); // Adiciona a classe ativa
    buttonElement.disabled = false; // Ativa o botão
  }
};

// Configuração para o botão de adicionar post
const addPostValidationConfig = {
  formSelector: '#add-post-form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button_type_add-post',
  inactiveButtonClass: 'pop-up__button_type_add-post-inactive', // Se houver alguma classe inativa para estilos
  activeButtonClass: 'pop-up__button_type_add-post-active'
};

// Aplicando a função de toggle para o botão de adicionar post
const addPostForm = document.querySelector(addPostValidationConfig.formSelector);
const addPostInputList = Array.from(addPostForm.querySelectorAll(addPostValidationConfig.inputSelector));
const addPostSubmitButton = addPostForm.querySelector(addPostValidationConfig.submitButtonSelector);

// Verifica o estado inicial do botão
toggleButtonState(addPostInputList, addPostSubmitButton, addPostValidationConfig);

// Adiciona evento de input para atualizar o estado do botão
addPostInputList.forEach((input) => {
  input.addEventListener('input', () => {
    toggleButtonState(addPostInputList, addPostSubmitButton, addPostValidationConfig);
  });
});


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
