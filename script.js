import FormValidator from './formValidator.js';
import Card from './card.js';
import { closeAllPopups, handleEscapeKey, handleClickOutside, openProfilePopup, closeProfilePopup, addImageClickListener, closeOnEscapeOrClickOutside } from './utils.js';

// Configuração de validação
const editProfileValidationConfig = {
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-button',
  activeButtonClass: 'pop-up__form-button-active',
  errorClass: 'error-message'
};
const addPostValidationConfig = {
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button_type_add-post',
  activeButtonClass: 'pop-up__button_type_add-post-active',
  errorClass: 'error-message'
};

// Habilitar a validação
const editProfileForm = document.getElementById("pop-up__form");
new FormValidator(editProfileValidationConfig, editProfileForm).enableValidation();

const addPostForm = document.getElementById("add-post-form");
new FormValidator(addPostValidationConfig, addPostForm).enableValidation();

// SELETORES DO FORMULÁRIO
const formElement = document.querySelector("#pop-up__form");
const nameInput = document.querySelector(".pop-up__form-input-name");
const infoInput = document.querySelector(".pop-up__form-input-info");
const submitButton = document.querySelector(".pop-up__form-button");
const popUpCloseButton = document.querySelector(".pop-up__close-button");
const editButton = document.querySelector(".profile__edit-button");

// Event Listener para abrir pop-up de perfil
editButton.addEventListener("click", () => openProfilePopup(document.querySelector(".pop-up"), submitButton));
popUpCloseButton.addEventListener("click", closeProfilePopup);

// Event Listeners para o formulário de perfil
formElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  if (formElement.checkValidity()) {
    const profileName = document.querySelector(".profile__info-user");
    const profileDescription = document.querySelector(".profile__description");

    profileName.textContent = nameInput.value;
    profileDescription.textContent = infoInput.value;

    formElement.reset(); // Limpa o formulário
    closeProfilePopup(); // Fecha o pop-up
  }
});

// Funções para cards

// CARDS INICIAIS
const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];

// CRIA CARD
function createCard(cardData) {
  const card = new Card(cardData);
  return card.getCardElement();
}

// ADICIONA NA PÁGINA PELO DOM
function addCardsToPage() {
  const cardGrid = document.querySelector(".card-grid");
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardGrid.appendChild(card);
  });
}

function initializePage() {
  addCardsToPage();
}

document.addEventListener("DOMContentLoaded", initializePage);

// Fechar pop-up de imagem
const closeImageButton = document.querySelector(".image-pop-up__close-button");
closeImageButton.addEventListener("click", closeAllPopups);

// Event Listener para abrir pop-up de adicionar post
const addPostButton = document.querySelector(".profile__add-post");
const addPostPopUp = document.querySelector(".pop-up_type_add-post");

addPostButton.addEventListener("click", function () {
  addPostPopUp.classList.remove("disable");
  document.addEventListener("keydown", closeOnEscapeOrClickOutside);
  document.addEventListener("click", closeOnEscapeOrClickOutside);
});

// Fechar pop-up de adicionar post
const closeAddPostButton = addPostPopUp.querySelector(".pop-up__close-button_type_add-post");
closeAddPostButton.addEventListener("click", closeAllPopups);

// Adicionar novo post
const postTitleInput = document.querySelector("input[name='titulo']");
const postLinkInput = document.querySelector("input[name='link']");

addPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = postTitleInput.value;
  const link = postLinkInput.value;

  // Adicionar o novo card ao início da lista
  const cardGrid = document.querySelector(".card-grid");
  const newCard = createCard({ name: title, link: link });
  cardGrid.prepend(newCard);

  addPostForm.reset();
  closeAllPopups();
});
