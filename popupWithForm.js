import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector("form");
    this._inputList = this._formElement
      ? Array.from(this._formElement.querySelectorAll(".pop-up__input"))
      : [];
    this._submitButton = this._formElement.querySelector(".pop-up__form-button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._formElement) {
      this._formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  close() {
    super.close();
    if (this._formElement) {
      this._formElement.reset();
    }
  }
}
