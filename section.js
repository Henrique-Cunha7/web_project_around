export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Lista inicial de dados
    this._renderer = renderer; // Função responsável por criar e renderizar cartões
    this._container = document.querySelector(containerSelector); // Contêiner onde os cartões serão adicionados
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element); // Adiciona no início
  }
}