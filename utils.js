export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Função para validar URL
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}



// ------------------------------------------------------

// Função para fechar todos os pop-ups
export function closeAllPopups() {
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
export function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeAllPopups();
  }
}

// Função para fechar pop-up ao clicar fora
export function handleClickOutside(event) {
  if (event.target.classList.contains("pop-up") || event.target.classList.contains("image-pop-up")) {
    closeAllPopups();
  }
}

// Função para abrir pop-up de perfil
export function openProfilePopup(popUp, submitButton) {
  popUp.classList.remove("disable");
  submitButton.classList.remove("pop-up__form-button-active");
  submitButton.disabled = true;
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClickOutside);
}

// Função para fechar pop-up de perfil
export function closeProfilePopup() {
  closeAllPopups();
}

// Função para abrir pop-up de imagem
export function addImageClickListener(image, text) {
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

// Função para fechar pop-up ao pressionar ESC ou clicar fora
export function closeOnEscapeOrClickOutside(event) {
  if (event.type === "keydown" && event.key === "Escape") {
    closeAllPopups();
  } else if (event.type === "click" &&
            (event.target.classList.contains("pop-up") || event.target.classList.contains("image-pop-up"))) {
    closeAllPopups();
  }
}
