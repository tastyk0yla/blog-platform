export default class blogApi {
  _API_BASE = 'https://blog.kata.academy/api'

  getArticlesList = async (offset, token) => {
    const fetchOpts = token ? { headers: { Authorization: `Token ${token}` } } : {}
    const response = await fetch(`${this._API_BASE}/articles?limit=5&offset=${offset}`, fetchOpts)
    return await response.json()
  }

  getAnArticle = async (slug, token) => {
    const fetchOpts = token ? { headers: { Authorization: `Token ${token}` } } : {}
    const response = await fetch(`${this._API_BASE}/articles/${slug}`, fetchOpts)
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

  putLike = async (token, slug) => {
    const response = await fetch(`${this._API_BASE}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  }

  removeLike = async (token, slug) => {
    const response = await fetch(`${this._API_BASE}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return await response.json()
  }

  createArticle = async (token, articleObj) => {
    const response = await fetch(`${this._API_BASE}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleObj),
    })

    return await response.json()
  }

  updateArticle = async (token, slug, newArticleObj) => {
    const response = await fetch(`${this._API_BASE}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticleObj),
    })

    return await response.json()
  }

  deleteArticle = async (token, slug) => {
    const response = await fetch(`${this._API_BASE}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response
  }
}
