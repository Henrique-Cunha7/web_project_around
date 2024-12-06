import FormValidator from './formValidator.js';
import Card from './card.js';
import Section from './section.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithImage from './popupWithImage.js';
import UserInfo from './userInfo.js';

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

// Instância da classe UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-user",
  infoSelector: ".profile__description",
});

// Instância do PopupWithForm para edição de perfil
const editProfilePopup = new PopupWithForm(".pop-up", (formValues) => {
  userInfo.setUserInfo({
    name: formValues.name,
    info: formValues.info,
  });
  console.log("Perfil atualizado com sucesso!");
});

// Adiciona os event listeners ao popup
editProfilePopup.setEventListeners();

// Seletores dos campos de entrada do formulário
const nameInput = document.querySelector(".pop-up__form-input-name");
const infoInput = document.querySelector(".pop-up__form-input-info");

// Botão de abrir o popup de edição de perfil
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  console.log("Abrindo popup de editar perfil...");

  nameInput.value = "";
  infoInput.value = "";

  editProfilePopup.open();
});


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

// Prevenir o comportamento de submit nos formulários de adicionar post
addPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tituloInput = document.getElementById("titulo");
  const linkInput = document.getElementById("link");

  if (tituloInput && linkInput) {
    console.log("Título:", tituloInput.value);
    console.log("Link:", linkInput.value);

    const newCard = createCard({
      name: tituloInput.value,
      link: linkInput.value
    });

    section.addItem(newCard);
    addPostForm.reset();
    closeAllPopups();
  } else {
    console.error('Erro: Elementos do formulário não foram encontrados.');
  }
});