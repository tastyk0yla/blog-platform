import blogApi from '../../services'
const api = new blogApi()

export const toggleFetching = (status) => ({ type: 'TOGGLE_FETCH', payload: status })
export const handleFetchError = (err) => ({ type: 'FETCH_ERROR', payload: err })
export const setPage = (page) => ({ type: 'SET_PAGE', payload: page })
export const pushArticles = (articles) => ({ type: 'PUSH_ARTICLES', payload: articles })
export const pushAnArticle = (article) => ({ type: 'PUSH_ARTICLE', payload: article })
export const toggleLogin = (status) => ({ type: 'TOGGLE_LOGIN', payload: status })
export const pushFormErrors = (errors) => ({ type: 'PUSH_FORM_ERRS', payload: errors })
export const setUserInfo = (userInfo) => ({ type: 'SET_USER', payload: userInfo })

export const logIn = (submittedForm) => (dispatch) => {
  const userObject = {
    user: { username: submittedForm.username, email: submittedForm.email, password: submittedForm.password },
  }
  dispatch(toggleFetching(true))
  api.logIn(userObject).then((response) => {
    if (response.errors) {
      dispatch(pushFormErrors(response.errors))
    }
    if (response.user) {
      localStorage.setItem('token', response.user.token)
      dispatch(setUserInfo({ ...response.user, isExtended: true }))
    }
    dispatch(toggleFetching(false))
  })
}

export const logOut = () => (dispatch) => {
  localStorage.setItem('token', '')
  dispatch(setUserInfo())
}

export const getArticles = (page) => (dispatch) => {
  const offset = page === 1 ? 0 : 5 * page - 5
  dispatch(toggleFetching(true))
  api.getArticlesList(offset).then(({ articles, articlesCount }) => {
    dispatch(pushArticles({ articles, articlesCount }))
    dispatch(toggleFetching(false))
  })
}

export const getAnArticle = (slug) => (dispatch) => {
  dispatch(toggleFetching(true))
  api.getAnArticle(slug).then((response) => {
    dispatch(pushAnArticle(response.article))
    dispatch(toggleFetching(false))
  })
}

export const registration = (submittedForm) => (dispatch) => {
  const userObject = {
    user: { username: submittedForm.username, email: submittedForm.email, password: submittedForm.password },
  }
  dispatch(toggleFetching(true))
  api.registration(userObject).then((response) => {
    if (response.errors) {
      dispatch(pushFormErrors(response.errors))
    }
    if (response.user) {
      localStorage.setItem('token', response.user.token)
      dispatch(setUserInfo(response.user))
    }
    dispatch(toggleFetching(false))
  })
}

export const getUserInfo = (token) => (dispatch) => {
  dispatch(toggleFetching(true))
  api.getUserInfo(token).then((response) => {
    if (response.user) {
      dispatch(setUserInfo({ ...response.user, isExtended: true }))
    }
    if (response.errors) {
      dispatch(pushFormErrors(response.errors))
    }
    dispatch(toggleFetching(false))
  })
}

export const updateUserInfo = (token, submittedForm) => (dispatch) => {
  dispatch(toggleFetching(true))
  const userObject = { user: submittedForm }
  api.updateUserInfo(token, userObject).then((response) => {
    if (response.user) {
      dispatch(setUserInfo({ ...response.user, isExtended: true }))
    }
    if (response.errors) {
      dispatch(pushFormErrors(response.errors))
    }
    dispatch(toggleFetching(false))
  })
}
