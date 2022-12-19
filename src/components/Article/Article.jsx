import { Button, Popconfirm, Result, Spin } from 'antd'
import { format, parseISO } from 'date-fns'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import defaultAvatar from '../../img/avatar.jpg'
import heartLiked from '../../img/heart-liked.svg'
import heart from '../../img/heart.svg'
import * as actions from '../../redux/actions'
import classes from './Article.module.scss'

const Article = ({
  isFetching,
  slug,
  article,
  getAnArticle,
  putLike,
  removeLike,
  userInfo,
  deleteArticle,
  isDeleted,
  clearArticleState,
  toggleDeleted,
  toggleEditing,
  isEditing,
}) => {
  const history = useHistory()

  const { title, favoritesCount, author, createdAt, description, tagList, body, favorited } = article
  const { token } = userInfo

  useEffect(() => {
    console.log(article)
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
  const spinner = (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  )
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
  const articleElement = (
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
            <img src={favorited ? heartLiked : heart} alt="icon-like" className={classes.icon_like} />
            <span>{favoritesCount}</span>
          </button>
          <ul className={classes.tag_list}>{tags}</ul>
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
      </div>
      <div className={classes.article_body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </>
  )
  let element = isFetching ? spinner : articleElement
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
