class Api {
  constructor({url}) {
    this._url = url
  }

  getInitialCards(token) {
    return fetch(this._url + '/cards/', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  getProfileInfo(token) {
    return fetch(this._url + '/users/me/', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  setProfileInfo(name, job, token) {
    return fetch(this._url + '/users/me/', {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse)
  }

  addCard(data, token) {
    return fetch(this._url + '/cards/', {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(data, token) {
    return fetch(this._url + '/cards/' + data, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse)
  }

  setLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  removeLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  toggleLikeCard(cardId, isLiked, token) {
    if (isLiked) {
      return this.setLike(cardId, token)
    } else {
      return this.removeLike(cardId, token)
    }
  }

  setUserAvatar(imageUrl, token) {
    return fetch(this._url + '/users/me/avatar', {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
  url: "https://mesto-back.azmorigan.nomoredomains.club",
})
