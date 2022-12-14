import { Fragment, useEffect } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { parseISO, format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import classes from './Article.module.scss'
import defaultAvatar from '../../img/avatar.jpg'
import heart from '../../img/heart.svg'
import * as actions from '../../redux/actions'
import heartLiked from '../../img/heart-liked.svg'

const Article = ({ isFetching, slug, article, getAnArticle, putLike, removeLike, userInfo }) => {
  const history = useHistory()

  const { title, favoritesCount, author, createdAt, description, tagList, body, favorited } = article
  const { token } = userInfo

  useEffect(() => {
    token ? getAnArticle(slug, token) : getAnArticle(slug)
  }, [token])

  let tags = []
  if (tagList?.length > 0)
    tags = tagList.map((tag, index) => (
      <li className={classes.tag} key={`${slug}-tag-#${index}`}>
        <span>{tag}</span>
      </li>
    ))

  const handleLike = favorited ? removeLike : putLike
  const created = createdAt ? parseISO(createdAt) : Date.now()

  const avatar = author?.image
  const element = isFetching ? (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  ) : (
    <div className={classes.article}>
      <div className={classes['article-header']}>
        <div className={classes['article--card-info']}>
          <Link to={`/articles/${slug}`} className={classes['article-title']}>
            {title}
          </Link>
          <button
            disabled={token ? false : true}
            className={classes['article-btn-like']}
            onClick={() => handleLike(token, slug)}
          >
            <img src={favorited ? heartLiked : heart} alt="icon-like" className={classes['icon-like']} />
            <span>{favoritesCount}</span>
          </button>
          <ul className={classes['tag-list']}>{tags}</ul>
        </div>
        <div className={classes['article--author-info']}>
          <div className={classes['article--name-and-date']}>
            <span>{author?.username}</span>
            <span>{format(created, 'LLLL d, yyyy')}</span>
          </div>
          <img className={classes['article--author-avatar']} src={avatar || defaultAvatar} alt="Author avatar" />
        </div>
      </div>
      <div className={classes.article_decs_and_actions}>
        <p className={classes['article-description']}>{description}</p>
        <div className={classes.article_actions}>
          <button className={classes.btn_delete}>
            <span>Delete</span>
          </button>
          <button
            className={classes.btn_edit}
            onClick={() => {
              history.push(`/articles/${slug}/edit`)
            }}
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
      <div className={classes['article-body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )

  return <Fragment>{element}</Fragment>
}

const mapStateToProps = ({ isFetching, article, userInfo }) => ({ isFetching, article, userInfo })

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Article)
