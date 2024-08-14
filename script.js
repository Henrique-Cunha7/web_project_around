// FORMULARIO

let formElement = document.querySelector("#pop-up__form");

let nameInput = document.querySelector(".pop-up__form-input-name");
let infoInput = document.querySelector(".pop-up__form-input-info");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let infoValue = infoInput.value;

  let profileName = document.querySelector(".profile__info-user");
  let profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileDescription.textContent = infoValue;

  nameInput.value = "";
  infoInput.value = "";

  popUp.classList.add("disable");

  submitButton.classList.remove("form__edit-button-active");
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// BOTAO DE EDITAR ABRIR O FORM

let editButton = document.querySelector(".profile__edit-button");

let popUp = document.querySelector(".pop-up");

editButton.addEventListener("click", function () {
  popUp.classList.remove("disable");
});

// BOTAO X DO POP UP FECHAR

let closeButton = document.querySelector(".pop-up__close-button");

closeButton.addEventListener("click", function () {
  popUp.classList.add("disable");
});

// BOTAO SUBMIT MUDAR DE CLASSE COM TEXTO ESCRITO

let submitButton = document.querySelector(".pop-up__form-button");

function checkInputs() {
  if (nameInput.value !== "" && infoInput.value !== "") {
    submitButton.classList.add("pop-up__form-button-active");
  } else {
    submitButton.classList.remove("pop-up__form-button-active");
  }
}

nameInput.addEventListener("input", checkInputs);

// Vetor com os dados iniciais dos cartões
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Função para criar um cartão
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

  // Adiciona eventos ao criar o card
  addImageClickListener(image, name.textContent);
  addDeleteClickListener(deleteButton);
  addLikeClickListener(likeButton);

  return card;
}

// Função para adicionar os cartões ao DOM
function addCardsToPage() {
  const cardGrid = document.querySelector(".card-grid");
  initialCards.forEach(cardData => {
    const card = createCard(cardData);
    cardGrid.appendChild(card);
  });
}

// Função para adicionar o evento de clique na imagem
function addImageClickListener(image, text) {
  image.addEventListener("click", function () {
    let imagePopUp = document.querySelector(".image-pop-up");
    let popUpImage = imagePopUp.querySelector(".image-pop-up__image");
    let popUpText = imagePopUp.querySelector(".image-pop-up__text");

    popUpImage.src = image.src;
    popUpText.textContent = text;
    imagePopUp.classList.remove("disable");
  });
}

// Função para adicionar o evento de exclusão
function addDeleteClickListener(deleteButton) {
  deleteButton.addEventListener("click", function () {
    const card = deleteButton.closest(".card");
    card.remove();
  });
}

// Função para adicionar o evento de like
function addLikeClickListener(likeButton) {
  likeButton.addEventListener("click", function () {
    const currentSrc = likeButton.src;
    likeButton.src = currentSrc.includes("likeimage.png") ? "./images/likedimage.png" : "./images/likeimage.png";
  });
}

// Inicializa a página
function initializePage() {
  addCardsToPage();
}

document.addEventListener("DOMContentLoaded", initializePage);

// Evento para fechar o pop-up de imagem
let closeImageButton = document.querySelector(".image-pop-up__close-button");

closeImageButton.addEventListener("click", function () {
  let imagePopUp = document.querySelector(".image-pop-up");
  imagePopUp.classList.add("disable");
});
