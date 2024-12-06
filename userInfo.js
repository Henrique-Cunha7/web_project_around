class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent
    };
  }

  setUserInfo({ name, info }) {
    if (name) this._nameElement.textContent = name;
    if (info) this._infoElement.textContent = info;
  }
}

export default UserInfo;
