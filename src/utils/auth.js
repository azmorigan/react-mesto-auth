export const BASE_URL = "https://auth.nomoreparties.co"

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => checkResponse(res))
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(data => {
      return data.json()
    })
    .then(res => res)
  // checkResponse не работает
}


function checkResponse(data) {
    if (data.ok) {
      return data.json()
    } else {
      return Promise.reject(data.status)
    }
}