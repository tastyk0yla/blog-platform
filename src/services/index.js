export default class blogApi {
  _API_BASE = 'https://blog.kata.academy/api'

  getArticlesList = async (offset) => {
    const response = await fetch(`${this._API_BASE}/articles?limit=5&offset=${offset}`)
    return await response.json()
  }

  getAnArticle = async (slug) => {
    const response = await fetch(`${this._API_BASE}/articles/${slug}`)
    return await response.json()
  }

  registration = async (userObject) => {
    const response = await fetch(`${this._API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    })
    return await response.json()
  }

  logIn = async (userObject) => {
    const response = await fetch(`${this._API_BASE}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    })
    return await response.json()
  }

  getUserInfo = async (token) => {
    const response = await fetch(`${this._API_BASE}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return await response.json()
  }

  updateUserInfo = async (token, userObject) => {
    const response = await fetch(`${this._API_BASE}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    })

    return await response.json()
  }
}
