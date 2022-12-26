import { Popconfirm } from 'antd'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import defaultAvatar from '../../img/avatar.jpg'
import heartLiked from '../../img/heart-liked.svg'
import heart from '../../img/heart.svg'
import { deleteArticle, putLike, removeLike, toggleEditing } from '../../redux/actions'
import { TagList } from '../TagList'
import classes from './ArticleHeader.module.scss'

const ArticleHeader = ({ isPreview, article, deleteArticle, userInfo, putLike, removeLike, toggleEditing }) => {
  const { slug, title, favoritesCount, author, createdAt, description, tagList, favorited } = article
  const token = userInfo?.token || localStorage.getItem('token')
  const [isLiked, setIsLiked] = useState(favorited)
  const [likesCount, setLikesCount] = useState(favoritesCount || 0)
  const history = useHistory()

  const handleLike = () => {
    if (isLiked) {
      removeLike(token, slug)
      setLikesCount(likesCount - 1)
    } else {
      putLike(token, slug)
      setLikesCount(likesCount + 1)
    }
    setIsLiked(!isLiked)
  }
  const created = createdAt ? parseISO(createdAt) : Date.now()

  const avatar = author?.image

  const articleActions = (
    <div className={classes.article_actions}>
      <Popconfirm
        placement={'right'}
        title="Are you sure to delete this task?"
        onConfirm={() => deleteArticle(token, slug)}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <button className={classes.btn_delete}>
          <span>Delete</span>
        </button>
      </Popconfirm>
      <button
        className={classes.btn_edit}
        onClick={() => {
          toggleEditing(true)
          history.push(`/articles/${slug}/edit`)
        }}
      >
        <span>Edit</span>
      </button>
    </div>
  )

  return (
    <>
      <div className={classes.article_header}>
        <div className={classes.article__card_info}>
          <Link to={`/articles/${slug}`} className={classes.article_title}>
            {title}
          </Link>
          <button
            disabled={token ? false : true}
            className={classes.article_btn_like}
            onClick={() => handleLike(token, slug)}
          >
            <img src={isLiked ? heartLiked : heart} alt="icon-like" className={classes.icon_like} />
            <span>{likesCount}</span>
          </button>
          <TagList tagList={tagList} slug={slug} />
        </div>
        <div className={classes.article__author_info}>
          <div className={classes.article__name_and_date}>
            <span>{author?.username}</span>
            <span>{format(created, 'LLLL d, yyyy')}</span>
          </div>
          <img className={classes.article__author_avatar} src={avatar || defaultAvatar} alt="Author avatar" />
        </div>
      </div>
      <div className={classes.article_decs_and_actions}>
        <p className={classes.article_description}>{description}</p>
        {!isPreview && userInfo?.username === article?.author?.username ? articleActions : null}
      </div>
    </>
  )
}

const mapStateToProps = ({ userInfo }) => ({ userInfo })
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteArticle, putLike, removeLike, toggleEditing }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleHeader)
