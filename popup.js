export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(`Popup with selector "${popupSelector}" not found.`);
    }
    this._closeButton = this._popup.querySelector(".pop-up__close-button") ||
                        this._popup.querySelector(".image-pop-up__close-button");

    if (!this._closeButton) {
      throw new Error(`Close button not found in popup "${popupSelector}".`);
    }
    this.setEventListeners();
  }

  open() {
    this._popup.classList.remove("disable");
  }

  close() {
    this._popup.classList.add("disable");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
