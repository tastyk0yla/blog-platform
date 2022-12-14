import { Pagination, Spin } from 'antd'
import { Fragment, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './ArticleList.module.scss'
import * as actions from '../../redux/actions'
import ArticleCard from '../ArticleCard'
const ArticleList = ({
  page,
  articles,
  articlesCount,
  isFetching,
  getArticles,
  setPage,
  putLike,
  removeLike,
  userInfo,
  clearArticleState,
  likeCounter,
}) => {
  useLayoutEffect(() => {
    clearArticleState()
    userInfo.token ? getArticles(page, userInfo.token) : getArticles(page)
  }, [page, likeCounter])

  let list = []
  if (articles?.length > 0) {
    list = articles.map((article) => (
      <ArticleCard article={article} key={article.slug} userInfo={userInfo} putLike={putLike} removeLike={removeLike} />
    ))
  }

  const element = isFetching ? (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  ) : (
    <Fragment>
      <ul className={classes.ArticleList}>{list}</ul>
      <Pagination
        current={page}
        pageSize={5}
        defaultCurrent={1}
        showSizeChanger={false}
        total={articlesCount}
        onChange={(page) => setPage(page)}
      />
    </Fragment>
  )

  return <Fragment>{element}</Fragment>
}

const mapStateToProps = ({ isFetching, articles, articlesCount, page, putLike, removeLike, userInfo, likeCounter }) => {
  return { isFetching, articles, articlesCount, page, putLike, removeLike, userInfo, likeCounter }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
