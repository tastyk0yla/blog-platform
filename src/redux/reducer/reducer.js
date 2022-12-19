const initialState = {
  isFetching: true,
  isError: false,
  articlesCount: 0,
  page: 1,
  error: null,
  articles: [],
  article: {},
  isDeleted: false,
  isEditing: false,
  formErrors: {},
  userInfo: {},
  likeCounter: 0,
  successfullyModified: false,
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
    case 'CLEAR_ARTICLE':
      return { ...state, article: {} }
    case 'SET_PAGE':
      return { ...state, page: payload }
    case 'PUSH_FORM_ERRS':
      return { ...state, formErrors: payload }
    case 'SET_USER':
      return payload ? { ...state, formErrors: {}, userInfo: payload } : { ...state, formErrors: {}, userInfo: {} }
    case 'TOGGLE_LIKE':
      return { ...state, likeCounter: state.likeCounter + 1 }
    case 'TOGGLE_DELETED':
      return { ...state, isDeleted: payload }
    case 'TOGGLE_EDIT':
      return { ...state, isEditing: payload }
    case 'TOGGLE_SUCCESS':
      return { ...state, successfullyModified: payload }
    default:
      return state
  }
}

export default reducer
