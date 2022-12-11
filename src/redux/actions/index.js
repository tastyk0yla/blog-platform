import blogApi from '../../services'
const api = new blogApi()

export const toggleFetching = (status) => ({ type: 'TOGGLE_FETCH', payload: status })
export const handleFetchError = (err) => ({ type: 'FETCH_ERROR', payload: err })
export const setPage = (page) => ({ type: 'SET_PAGE', payload: page })

export const pushArticles = (articles) => ({ type: 'PUSH_ARTICLES', payload: articles })
export const getArticles = (page) => (dispatch) => {
  const offset = page === 1 ? 0 : 5 * page - 5
  dispatch(toggleFetching(true))
  api.getArticlesList(offset).then(({ articles, articlesCount }) => {
    dispatch(pushArticles({ articles, articlesCount }))
    dispatch(toggleFetching(false))
  })
}

export const pushAnArticle = (article) => ({ type: 'PUSH_ARTICLE', payload: article })

export const getAnArticle = (slug) => (dispatch) => {
  dispatch(toggleFetching(true))
  api.getAnArticle(slug).then((response) => {
    console.log(response.article)
    dispatch(pushAnArticle(response.article))
    dispatch(toggleFetching(false))
  })
}
