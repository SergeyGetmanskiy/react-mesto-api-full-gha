class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
  }

  _checkServerResponse(res) {
    if(res.ok) {
      return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
    }})
    .then(this._checkServerResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: data.name,
        about: data.about
    })})
    .then(this._checkServerResponse)}

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        avatar: data.avatar,
    })})
    .then(this._checkServerResponse)
  }

  getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
    }})
    .then(this._checkServerResponse)}

  postUserCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'},
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
        authorization: this._authorization,
        'Content-Type': 'application/json'}
      })
    .then(this._checkServerResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    const requestMethod = isLiked ? "PUT": "DELETE"; 
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: requestMethod,
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'}
      })
    .then(this._checkServerResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://sgetmansky.frontend.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});