// card.js
export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._nameElement = this._element.querySelector(".card__name");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like");

    this._setEventListeners();
  }

  _getTemplate() {
    // TEMPLATE VEM PELO DOM ENTAO TRAZER ELE MANUALMENTE
    const card = document.createElement("div");
    card.classList.add("card");

    const deleteButton = document.createElement("img");
    deleteButton.src = "./images/DELETE.png";
    deleteButton.alt = "delete button";
    deleteButton.classList.add("card__delete-button");

    const image = document.createElement("img");
    image.classList.add("card__image");

    const info = document.createElement("div");
    info.classList.add("card__info");

    const name = document.createElement("h2");
    name.classList.add("card__name");

    const likeButton = document.createElement("img");
    likeButton.src = "./images/likeimage.png";
    likeButton.alt = "like button";
    likeButton.classList.add("card__like");

    info.appendChild(name);
    info.appendChild(likeButton);
    card.appendChild(deleteButton);
    card.appendChild(image);
    card.appendChild(info);

    return card;
  }

  _setEventListeners() {
    this._image.addEventListener("click", this._handleImageClick.bind(this));
    this._deleteButton.addEventListener("click", this._handleDeleteClick.bind(this));
    this._likeButton.addEventListener("click", this._handleLikeClick.bind(this));
  }

  _handleImageClick() {
    const imagePopUp = document.querySelector(".image-pop-up");
    const popUpImage = imagePopUp.querySelector(".image-pop-up__image");
    const popUpText = imagePopUp.querySelector(".image-pop-up__text");

    popUpImage.src = this._image.src;
    popUpText.textContent = this._name;
    imagePopUp.classList.remove("disable");

    document.addEventListener("keydown", this._closeOnEscape.bind(this));
    document.addEventListener("click", this._closeOnClickOutside.bind(this));
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    const currentSrc = this._likeButton.src;
    this._likeButton.src = currentSrc.includes("likeimage.png")
      ? "./images/likedimage.png"
      : "./images/likeimage.png";
  }

  getCardElement() {
    this._nameElement.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `${this._name} image`;
    return this._element;
  }

  _closeOnEscape(event) {
    if (event.key === "Escape") {
      document.querySelector(".image-pop-up").classList.add("disable");
      document.removeEventListener("keydown", this._closeOnEscape.bind(this));
      document.removeEventListener("click", this._closeOnClickOutside.bind(this));
    }
  }

  _closeOnClickOutside(event) {
    if (event.target.classList.contains("image-pop-up")) {
      document.querySelector(".image-pop-up").classList.add("disable");
      document.removeEventListener("keydown", this._closeOnEscape.bind(this));
      document.removeEventListener("click", this._closeOnClickOutside.bind(this));
    }
  }
}
