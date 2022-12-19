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
export const likeClicked = () => ({ type: 'TOGGLE_LIKE' })

export const clearArticleState = () => ({ type: 'CLEAR_ARTICLE' })
export const toggleDeleted = (status) => ({ type: 'TOGGLE_DELETED', payload: status })
export const toggleEditing = (status) => ({ type: 'TOGGLE_EDIT', payload: status })
export const toggleSuccessfullyModified = (status) => ({ type: 'TOGGLE_SUCCESS', payload: status })

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

export const getArticleWithFineStrings = (article) => {
  const shortTitle = article.title.length > 50 ? `${article.title.substring(0, 50)}..` : article.title
  const shortDescription =
    article.description.length > 200 ? `${article.description.substring(0, 200)}..` : article.description
  const shortTags = article.tagList.reduce((acc, tag) => {
    tag.length > 20 ? acc.push(`${tag.substring(0, 20)}..`) : acc.push(tag)
    return acc
  }, [])
  return { ...article, title: shortTitle, description: shortDescription, tagList: shortTags }
}

export const getArticles =
  (page, token = false) =>
  (dispatch) => {
    const offset = page === 1 ? 0 : 5 * page - 5

    dispatch(toggleFetching(true))
    api.getArticlesList(offset, token).then(({ articles, articlesCount }) => {
      const fineArticles = articles.map((article) => getArticleWithFineStrings(article))
      dispatch(pushArticles({ articles: fineArticles, articlesCount }))
      dispatch(toggleFetching(false))
    })
  }

export const getAnArticle =
  (slug, token = false) =>
  (dispatch) => {
    dispatch(toggleFetching(true))
    api.getAnArticle(slug, token).then((response) => {
      const fineArticle = getArticleWithFineStrings(response.article)
      dispatch(pushAnArticle(fineArticle))
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

export const putLike = (token, slug) => (dispatch) => {
  api.putLike(token, slug).then((response) => {
    const fineArticle = getArticleWithFineStrings(response.article)
    dispatch(pushAnArticle(fineArticle))
    dispatch(likeClicked())
    dispatch(toggleFetching(false))
  })
}

export const removeLike = (token, slug) => (dispatch) => {
  api.removeLike(token, slug).then((response) => {
    const fineArticle = getArticleWithFineStrings(response.article)
    dispatch(pushAnArticle(fineArticle))
    dispatch(likeClicked())
    dispatch(toggleFetching(false))
  })
}

const getTagList = (object) => {
  const entries = Object.entries(object)
  const tagList = entries.reduce((acc, entrie) => {
    if (entrie[0].includes('tag') && entrie[1]) acc.push(entrie[1])
    return acc
  }, [])
  return tagList
}

export const createArticle = (token, submittedForm) => (dispatch) => {
  const tagList = getTagList(submittedForm)
  const articleObj = {
    article: {
      title: submittedForm.title,
      description: submittedForm.description,
      body: submittedForm.text,
      tagList: tagList,
    },
  }

  toggleFetching(true)
  api.createArticle(token, articleObj).then((response) => {
    if (response.article) {
      const fineArticle = getArticleWithFineStrings(response.article)
      dispatch(pushAnArticle(fineArticle))
      dispatch(toggleSuccessfullyModified(true))
    }
    toggleFetching(false)
  })
}

export const updateArticle = (token, slug, submittedForm) => (dispatch) => {
  const tagList = getTagList(submittedForm)
  const newArticleObj = {
    article: {
      title: submittedForm.title,
      description: submittedForm.description,
      body: submittedForm.text,
      tagList: tagList,
    },
  }
  toggleFetching(true)
  api.updateArticle(token, slug, newArticleObj).then((response) => {
    console.log(response)
    if (response.article) {
      const fineArticle = getArticleWithFineStrings(response.article)
      dispatch(pushAnArticle({ ...fineArticle, successfullyModified: true }))
      dispatch(toggleSuccessfullyModified(true))
      dispatch(toggleEditing(false))
    }
    toggleFetching(false)
  })
}

export const deleteArticle = (token, slug) => (dispatch) => {
  dispatch(toggleFetching(true))
  api.deleteArticle(token, slug).then((response) => {
    response.ok && dispatch(toggleDeleted(true))
    dispatch(toggleFetching(false))
  })
}
