class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkServerResponse(res) {
    if(res.ok) {
      return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

  _getToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      return token
    } else {
      return null
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
    })
    .then(this._checkServerResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
    })})
    .then(this._checkServerResponse)}

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
    })})
    .then(this._checkServerResponse)
  }

  getCardList() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
    })
    .then(this._checkServerResponse)}

  postUserCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })})
    .then(this._checkServerResponse)
  }

  deleteUserCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      })
    .then(this._checkServerResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    const requestMethod = isLiked ? "PUT": "DELETE"; 
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      })
    .then(this._checkServerResponse)
  }
};

export const api = new Api({
  baseUrl: 'http://localhost:3000'
});