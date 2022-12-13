import { Fragment, useEffect } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { parseISO, format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import classes from './Article.module.scss'
import defaultAvatar from '../../img/avatar.jpg'
import heart from '../../img/heart.svg'
import * as actions from '../../redux/actions'
// proverka-markdown-8rn0t9

const Article = ({ isFetching, slug, article, getAnArticle }) => {
  useEffect(() => {
    getAnArticle(slug)
  }, [])

  const { title, favoritesCount, author, createdAt, description, tagList, body } = article
  let tags = []
  if (tagList?.length > 0)
    tags = tagList.map((tag, index) => (
      <li className={classes.tag} key={`${slug}-tag-#${index}`}>
        <span>{tag}</span>
      </li>
    ))

  const created = createdAt ? parseISO(createdAt) : Date.now()

  const avatar = author?.image
  const element = isFetching ? (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  ) : (
    <div className={classes.Article}>
      <div className={classes['Article-header']}>
        <div className={classes['Article--card-info']}>
          <Link to={`/articles/${slug}`} className={classes['Article-title']}>
            {title}
          </Link>
          <button className={classes['Article-btn-like']}>
            <img src={heart} alt="icon-like" className={classes['icon-like']} />
            <span>{favoritesCount}</span>
          </button>
          <ul className={classes['tag-list']}>{tags}</ul>
        </div>
        <div className={classes['Article--author-info']}>
          <div className={classes['Article--name-and-date']}>
            <span>{author?.username}</span>
            <span>{format(created, 'LLLL d, yyyy')}</span>
          </div>
          <img className={classes['Article--author-avatar']} src={avatar || defaultAvatar} alt="Author avatar" />
        </div>
      </div>
      <p className={classes['Article-description']}>{description}</p>
      <div className={classes['Article-body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )

  return <Fragment>{element}</Fragment>
}

const mapStateToProps = ({ isFetching, article }) => ({ isFetching, article })

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Article)
