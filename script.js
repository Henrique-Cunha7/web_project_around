import FormValidator from './formValidator.js';
import Card from './card.js';
import Section from './section.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithImage from './popupWithImage.js';

// Configuração de validação
const addPostValidationConfig = {
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button_type_add-post',
  activeButtonClass: 'pop-up__button_type_add-post-active',
  errorClass: 'error-message'
};

const editProfileValidationConfig = {
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-button',
  activeButtonClass: 'pop-up__form-button-active',
  errorClass: 'error-message'
};

// Habilitar a validação do formulário de adicionar post
const addPostForm = document.getElementById("add-post-form");
new FormValidator(addPostValidationConfig, addPostForm).enableValidation();

// Habilitar a validação do formulário de editar perfil
const editProfileForm = document.getElementById("pop-up__form");
new FormValidator(editProfileValidationConfig, editProfileForm).enableValidation();

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

// CRIAÇÃO DA INSTÂNCIA DO SECTION E RENDERIZAÇÃO DOS CARDS
const section = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createCard(cardData);
    section.addItem(card);
  }
}, '.card-grid');

// Renderiza os cards na inicialização
section.renderItems();

// FECHAR POPUPS
function closeAllPopups() {
  const popups = document.querySelectorAll('.pop-up, .image-pop-up');
  popups.forEach(popup => {
    popup.classList.add('disable');
  });
}

// POPUP DE IMAGEM
const imagePopup = new PopupWithImage(".image-pop-up");

// Adicionar evento para abrir o popup de imagem
const imageElements = document.querySelectorAll(".card__image");
imageElements.forEach(image => {
  image.addEventListener("click", () => imagePopup.open(image.src, image.alt));
});



// SELETORES DO FORMULÁRIO
const formElement = document.querySelector("#pop-up__form");
const nameInput = document.querySelector(".pop-up__form-input-name");
const infoInput = document.querySelector(".pop-up__form-input-info");
const submitButton = document.querySelector(".pop-up__form-button");
const popUpCloseButton = document.querySelector(".pop-up__close-button");
const editButton = document.querySelector(".profile__edit-button");

// POPUP DE EDITAR PERFIL
const editProfilePopup = new PopupWithForm(".pop-up", (formValues) => {
  // Atualiza o perfil com os dados do formulário
  const profileName = document.querySelector(".profile__info-user");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = formValues.name;
  profileDescription.textContent = formValues.info;

  editProfilePopup.close();  // Fecha o popup após salvar
});

// Event Listener para abrir pop-up de perfil
editButton.addEventListener("click", () => {
  // Preenche o formulário com os dados atuais do perfil
  const profileName = document.querySelector(".profile__info-user");
  const profileDescription = document.querySelector(".profile__description");

  nameInput.value = '';
  infoInput.value = '';

  editProfilePopup.open();  // Abre o pop-up de editar perfil
});

// Fechar pop-up de perfil
popUpCloseButton.addEventListener("click", () => editProfilePopup.close());

// Event Listeners para o formulário de perfil
formElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  if (formElement.checkValidity()) {
    // Submete os dados
    const profileName = document.querySelector(".profile__info-user");
    const profileDescription = document.querySelector(".profile__description");

    profileName.textContent = nameInput.value;
    profileDescription.textContent = infoInput.value;

    formElement.reset(); // Limpa o formulário
    editProfilePopup.close(); // Fecha o pop-up
  }
});
// // POPUP DE EDITAR PERFIL
// const editProfilePopup = new PopupWithForm(".pop-up", (formValues) => {
//   console.log("Dados de edição de perfil:", formValues);

//   // Atualizando as informações do perfil
//   const profileName = document.querySelector(".profile__info-user");
//   const profileDescription = document.querySelector(".profile__description");

//   profileName.textContent = formValues.name;  // Atualizando o nome
//   profileDescription.textContent = formValues.info;  // Atualizando a descrição

//   // Fechando o pop-up após atualizar o perfil
//   editProfilePopup.close();
// });

// // Para abrir o pop-up de editar perfil
// const editButton = document.querySelector(".profile__edit-button");
// editButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   const nameInput = document.querySelector(".pop-up__form-input-name");
//   const infoInput = document.querySelector(".pop-up__form-input-info");

//   // Preenchendo os campos do formulário com os valores atuais do perfil
//   nameInput.value = document.querySelector(".profile__info-user").textContent;
//   infoInput.value = document.querySelector(".profile__description").textContent;

//   // Remover a classe disable para abrir o pop-up
//   const popup = document.querySelector(".pop-up");
//   popup.classList.remove('disable');

//   // Abrir o pop-up de editar perfil
//   editProfilePopup.open();
// });

// POPUP DE ADICIONAR POST
const addPostPopup = new PopupWithForm(".pop-up_type_add-post", (formValues) => {
  const cardData = {
    name: formValues.titulo,
    link: formValues.link,
  };
  const newCard = createCard(cardData);
  section.addItem(newCard); // Adiciona o novo card à seção
  addPostPopup.close(); // Fecha o popup após adicionar o card
});

// Botões para abrir os popups
const addPostButton = document.querySelector(".profile__add-post"); // Botão de adicionar post

addPostButton.addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão de submissão
  addPostPopup.open(); // Abre o popup de adicionar post
  editProfilePopup.close(); // Garante que o popup de editar perfil será fechado
});

// Prevenir o comportamento de submit nos formulários de editar perfil e adicionar post
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
