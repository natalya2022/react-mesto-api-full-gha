export default class Api {
  constructor(apiParams) {
    this._baseUrl = apiParams.baseUrl;
    this._headers = apiParams.headers;
    console.log(process.env);
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(res => this._checkRequest(res));
  }

  getInitialCards() {
    return this._request(`/cards`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  addNewCard(item) {
    return this._request(`/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  editUserProfile({ name, about }) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  editUserAvatar({ avatar }) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  likeCard(cardId, like) {
    return this._request(`/cards/${cardId}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const apiParams = {
  //baseUrl: 'http://localhost:3000',  
  baseUrl: 'https://api.places.nomoreparties.co',
  headers: {   
    'Content-Type': 'application/json'
  }
};

export const api = new Api(apiParams);
