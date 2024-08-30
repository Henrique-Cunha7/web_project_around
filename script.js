import { enableValidation } from './validate.js';

// Configuração de validação
const validationConfig = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-button',
  activeButtonClass: 'pop-up__form-button-active',
  errorClass: 'error-message'
};

// Habilitar a validação
enableValidation(validationConfig);

// SELETORES DO FORMULÁRIO
const formElement = document.querySelector("#pop-up__form");
const nameInput = document.querySelector(".pop-up__form-input-name");
const infoInput = document.querySelector(".pop-up__form-input-info");
const submitButton = document.querySelector(".pop-up__form-button");
const popUp = document.querySelector(".pop-up");
const popUpCloseButton = document.querySelector(".pop-up__close-button");
const editButton = document.querySelector(".profile__edit-button");

// Função para fechar todos os pop-ups
function closeAllPopups() {
  document.querySelectorAll(".pop-up").forEach(popup => {
    popup.classList.add("disable");
  });
  document.querySelectorAll(".image-pop-up").forEach(popup => {
    popup.classList.add("disable");
  });
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleClickOutside);
}

// Função para fechar pop-up ao pressionar ESC
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeAllPopups();
  }
}

// Função para fechar pop-up ao clicar fora
function handleClickOutside(event) {
  if (event.target.classList.contains("pop-up") || event.target.classList.contains("image-pop-up")) {
    closeAllPopups();
  }
}

// Função para abrir pop-up de perfil
function openProfilePopup() {
  popUp.classList.remove("disable");
  submitButton.classList.remove("pop-up__form-button-active");
  submitButton.disabled = true;
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClickOutside);
  checkInputs();
}

// Função para fechar pop-up de perfil
function closeProfilePopup() {
  closeAllPopups();
}

// Event Listeners popup perfil
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

editButton.addEventListener("click", openProfilePopup);
popUpCloseButton.addEventListener("click", closeProfilePopup);

// Funções para cards
const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const deleteButton = document.createElement("img");
  deleteButton.src = "./images/DELETE.png";
  deleteButton.alt = "delete button";
  deleteButton.classList.add("card__delete-button");

  const image = document.createElement("img");
  image.src = cardData.link;
  image.alt = `${cardData.name} image`;
  image.classList.add("card__image");

  const info = document.createElement("div");
  info.classList.add("card__info");

  const name = document.createElement("h2");
  name.classList.add("card__name");
  name.textContent = cardData.name;

  const likeButton = document.createElement("img");
  likeButton.src = "./images/likeimage.png";
  likeButton.alt = "like button";
  likeButton.classList.add("card__like");

  info.appendChild(name);
  info.appendChild(likeButton);
  card.appendChild(deleteButton);
  card.appendChild(image);
  card.appendChild(info);

  addImageClickListener(image, name.textContent);
  addDeleteClickListener(deleteButton);
  addLikeClickListener(likeButton);

  return card;
}

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

// Função para abrir pop-up de imagem
function addImageClickListener(image, text) {
  image.addEventListener("click", function () {
    const imagePopUp = document.querySelector(".image-pop-up");
    const popUpImage = imagePopUp.querySelector(".image-pop-up__image");
    const popUpText = imagePopUp.querySelector(".image-pop-up__text");

    popUpImage.src = image.src;
    popUpText.textContent = text;
    imagePopUp.classList.remove("disable");

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);
  });
}

// Fechar pop-up de imagem
const closeImageButton = document.querySelector(".image-pop-up__close-button");
closeImageButton.addEventListener("click", closeAllPopups);

// Função para excluir card
function addDeleteClickListener(deleteButton) {
  deleteButton.addEventListener("click", function () {
    const card = deleteButton.closest(".card");
    card.remove();
  });
}

// Função para alterar imagem do botão de like
function addLikeClickListener(likeButton) {
  likeButton.addEventListener("click", function () {
    const currentSrc = likeButton.src;
    likeButton.src = currentSrc.includes("likeimage.png")
      ? "./images/likedimage.png"
      : "./images/likeimage.png";
  });
}

// Função para fechar pop-up ao pressionar ESC ou clicar fora
function closeOnEscapeOrClickOutside(event) {
  if (event.type === "keydown" && event.key === "Escape") {
    closeAllPopups();
  } else if (event.type === "click" &&
            (event.target.classList.contains("pop-up") || event.target.classList.contains("image-pop-up"))) {
    closeAllPopups();
  }
}

// Pop-up de adicionar post
const addPostButton = document.querySelector(".profile__add-post");
const addPostPopUp = document.querySelector(".pop-up_type_add-post");

addPostButton.addEventListener("click", function () {
  addPostPopUp.classList.remove("disable");
  document.removeEventListener("keydown", closeOnEscapeOrClickOutside);
  document.removeEventListener("click", closeOnEscapeOrClickOutside);
  document.addEventListener("keydown", closeOnEscapeOrClickOutside);
  document.addEventListener("click", closeOnEscapeOrClickOutside);
});

// Fechar pop-up de adicionar post
const closeAddPostButton = addPostPopUp.querySelector(".pop-up__close-button_type_add-post");
closeAddPostButton.addEventListener("click", function () {
  closeAllPopups();
});

// Adicionar card
const addPostForm = document.querySelector("#add-post-form");
const postTitleInput = document.querySelector("input[name='titulo']");
const postLinkInput = document.querySelector("input[name='link']");
const addPostSubmitButton = document.querySelector(".pop-up__button_type_add-post");

// Função para validar URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Função para exibir mensagem de erro no formulário de adicionar post
function showAddPostError(input, message) {
  const errorSpan = document.getElementById(`${input.name}-error`);
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
  }
}

// Função para remover mensagem de erro no formulário de adicionar post
function hideAddPostError(input) {
  const errorSpan = document.getElementById(`${input.name}-error`);
  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }
}

// Função para validar input no formulário de adicionar post
function validateAddPostInput(input) {
  const minLength = parseInt(input.getAttribute("minlength"), 10);
  const maxLength = parseInt(input.getAttribute("maxlength"), 10);
  const value = input.value.trim();

  if (value.length < minLength) {
    showAddPostError(input, `Deve ter pelo menos ${minLength} caracteres.`);
  } else if (value.length > maxLength) {
    showAddPostError(input, `Deve ter no máximo ${maxLength} caracteres.`);
  } else {
    hideAddPostError(input);
  }
}

// Validação ao digitar nos campos de adicionar post
postTitleInput.addEventListener("input", () => validateAddPostInput(postTitleInput));
postLinkInput.addEventListener("input", () => {
  if (!isValidURL(postLinkInput.value)) {
    showAddPostError(postLinkInput, "URL inválida.");
  } else {
    hideAddPostError(postLinkInput);
  }
});

// Adicionar novo post
addPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = postTitleInput.value;
  const link = postLinkInput.value;

  if (title && isValidURL(link)) {
    const newCardData = { name: title, link: link };
    const newCard = createCard(newCardData);
    document.querySelector(".card-grid").prepend(newCard);
    addPostForm.reset(); // Limpa o formulário
    closeAllPopups(); // Fecha o pop-up
  } else {
    // Exibir mensagens de erro
    if (!title) showAddPostError(postTitleInput, "O título não pode estar vazio.");
    if (!isValidURL(link)) showAddPostError(postLinkInput, "URL inválida.");
  }
});


function checkInputs() {
  const isNameValid = validateInput(nameInput);
  const isInfoValid = validateInput(infoInput);

  if (isNameValid && isInfoValid) {
    submitButton.classList.add("pop-up__form-button-active");
    submitButton.disabled = false; // Ativa o botão
  } else {
    submitButton.classList.remove("pop-up__form-button-active");
    submitButton.disabled = true; // Desativa o botão
  }
}


