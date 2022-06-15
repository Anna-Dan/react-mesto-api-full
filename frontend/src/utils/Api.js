export class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  changeLike(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }
}
const api = new Api({
  baseUrl: 'https://api.mesto.annadan.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
