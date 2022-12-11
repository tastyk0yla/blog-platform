const initialState = {
  isLogged: false,
  isFetching: true,
  isError: false,
  articlesCount: 0,
  page: 1,
  error: null,
  articles: [],
  article: {},
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'TOGGLE_FETCH':
      return { ...state, isFetching: payload }
    case 'FETCH_ERROR':
      return { ...state, isFetching: false, isError: true, error: payload }
    case 'PUSH_ARTICLE':
      return { ...state, article: payload }
    case 'PUSH_ARTICLES':
      return { ...state, articles: payload.articles, articlesCount: payload.articlesCount }
    case 'SET_PAGE':
      return { ...state, page: payload }
    default:
      return state
  }
}

export default reducer
