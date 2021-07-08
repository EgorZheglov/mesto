export default class Api {
    constructor({baseUrl, headers}) {
      this._url = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      //проверка ответа на запрос
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      }


    getUserData(){
      //Получаем информацию пользователе с сервера.
        return fetch(`${this._url}/users/me`,{
          headers: this._headers
        })
        .then(this._checkResponse)
    }


    getInitialCards(){
      //получаем карточки, загруженные на сервер
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      })
      .then(this._checkResponse)
    }


    toggleLike(id, method){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: `${method}`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }


    sendCardInfo(name, link){
      //ОТправляем данные карточки
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`
        })
      })
      .then(this._checkResponse) 
    }

    deleteCard(id){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/${id}`, {
        method: `DELETE`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }

    sendUserData(name, about){
      //Отправляем измененные данные на сервер.
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          about: `${about}`
        })
      })
      .then(this._checkResponse)
    }

    sendUserAvatar(link){
      //Отправляем измененные данные на сервер.
      return fetch(`${this._url}/users/me/avatar`, {
        method:`PATCH`,
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${link}`,
        })
      })
      .then(this._checkResponse)
    }
  }

  

