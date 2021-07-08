export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems = (items) => {
        this._items = items.reverse(); //Массив с сервера приходит в обратном порядке поэтому используется reverse.
        this._items.forEach((item) => {
            this._renderer(item);         
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}