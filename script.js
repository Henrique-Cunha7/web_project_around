// FORMULARIO

let formElement = document.querySelector("#pop-up__form");

let nameInput = document.querySelector(".form__edit-name");
let infoInput = document.querySelector(".form__edit-info");

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

let closeButton = document.querySelector(".form__close-button");

closeButton.addEventListener("click", function () {
  popUp.classList.add("disable");
});

// BOTAO SUBMIT MUDAR DE CLASSE COM TEXTO ESCRITO

let submitButton = document.querySelector(".form__edit-button");

function checkInputs() {
  if (nameInput.value !== "" && infoInput.value !== "") {
    submitButton.classList.add("form__edit-button-active");
  } else {
    submitButton.classList.remove("form__edit-button-active");
  }
}

nameInput.addEventListener("input", checkInputs);
infoInput.addEventListener("input", checkInputs);
