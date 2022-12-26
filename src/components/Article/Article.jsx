import { Button, Result, Spin } from 'antd'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions'
import { ArticleHeader } from '../ArticleHeader'
import classes from './Article.module.scss'

const Article = ({
  isFetching,
  slug,
  article,
  getAnArticle,
  userInfo,
  isDeleted,
  clearArticleState,
  toggleDeleted,
  isEditing,
}) => {
  const history = useHistory()
  const { token } = userInfo

  useEffect(() => {
    if (isEmpty(article)) {
      token ? getAnArticle(slug, token) : getAnArticle(slug)
    }
  }, [token])

  useEffect(() => {
    return () => {
      if (!isEditing) clearArticleState()
      toggleDeleted(false)
    }
  }, [])

  const spinner = (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  )

  const articleElement = (
    <>
      <ArticleHeader isPreview={false} article={article} />
      <div className={classes.article_body}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </>
  )

  let element = isFetching ? spinner : articleElement

  const successfulRemoval = (
    <Result
      status="success"
      title="Successful removal"
      subTitle="You have successfully deleted the article"
      extra={[
        <Button type="primary" key="console" onClick={() => history.push('/')}>
          Go to articles
        </Button>,
      ]}
    />
  )

  if (isDeleted) element = successfulRemoval

  return <div className={classes.article}>{element}</div>
}

const mapStateToProps = ({ isFetching, article, userInfo, isDeleted, isEditing }) => ({
  isFetching,
  article,
  userInfo,
  isDeleted,
  isEditing,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Article)
