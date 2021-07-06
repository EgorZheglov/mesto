export default class Api {
    constructor({baseUrl, headers}) {
      this._url = baseUrl;
      this._headers = headers;
    }
  
    getUserData(){
      //Получаем информацию пользователе с сервера.
        return fetch(`${this._url}/users/me`,{
          headers: this._headers
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res.status)
      });
    }

    getInitialCards(){
      //получаем карточки, загруженные на сервер
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
    }


    toggleLike(id, method){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: `${method}`,
        headers: this._headers,
      })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
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
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      }) 
    }

    deleteCard(id){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/${id}`, {
        method: `DELETE`,
        headers: this._headers,
      })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
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
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
    }

  }

  

