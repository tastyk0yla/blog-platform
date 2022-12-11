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
}
