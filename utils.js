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
