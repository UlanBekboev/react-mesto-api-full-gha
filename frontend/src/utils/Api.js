class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  
  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(res => this._response(res));
  }

  addCard(data, jwt) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._response(res));
  }

  handleDeleteCard(cardId, jwt) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      }
    })
    .then(res => this._response(res));
  }

  changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      }
    })
    .then(res => this._response(res));
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(res => this._response(res));
  }

  setUserInfo(data, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(res => this._response(res));
  }

  setUserAvatar(data, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._response(res));
  }
}

const api = new Api({
  url: 'https://api.discover.nomoreparties.co',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
