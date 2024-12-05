import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".image-pop-up__image");
    this._captionElement = this._popup.querySelector(".image-pop-up__text");
  }

  open(imageUrl, caption) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;
    super.open();
  }
}
