class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._url + 'cards/', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(this._url + 'users/me/', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setProfileInfo(name, job) {
    return fetch(this._url + 'users/me/', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(this._url + 'cards/', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(data) {
    return fetch(this._url + 'cards/' + data, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  setLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  toggleLikeCard(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId)
    } else {
      return this.removeLike(cardId)
    }
  }

  setUserAvatar(imageUrl) {
    return fetch(this._url + 'users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: 'afa481ae-bc0e-4856-9ec0-3e79ade90f5a',
    'Content-Type': 'application/json',
  }
})
