import { Pagination, Spin } from 'antd'
import { Fragment, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions'
import { ArticleCard } from '../ArticleCard'
import classes from './ArticleList.module.scss'
const ArticleList = ({
  page,
  articles,
  articlesCount,
  isFetching,
  getArticles,
  setPage,
  userInfo,
  clearArticleState,
}) => {
  useLayoutEffect(() => {
    const token = userInfo.token || localStorage.getItem('token')
    clearArticleState()
    token ? getArticles(page, token) : getArticles(page)
  }, [page])

  let list = []
  if (articles?.length > 0) {
    list = articles.map((article) => <ArticleCard article={article} key={article.slug} />)
  }

  const element = isFetching ? (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  ) : (
    <Fragment>
      <ul className={classes.article_list}>{list}</ul>
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

const mapStateToProps = ({ isFetching, articles, articlesCount, page, userInfo }) => {
  return { isFetching, articles, articlesCount, page, userInfo }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
