import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");

    if (!this._form) {
      console.warn(`Form not found in popup "${popupSelector}".`);
    } else {
      this._inputList = this._form.querySelectorAll("input");
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
    }
  }

  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }
}
