import { parseISO, format } from 'date-fns'
import { Link } from 'react-router-dom'
import classes from './ArticleCard.module.scss'
import defaultAvatar from '../../img/avatar.jpg'
import heart from '../../img/heart.svg'
import heartLiked from '../../img/heart-liked.svg'

const ArticleCard = (props) => {
  const { slug, title, description, tagList, favoritesCount, author, createdAt, favorited } = props.article
  const avatar = author.image
  const { userInfo, removeLike, putLike } = props
  const token = userInfo.token
  let tags = []
  if (tagList?.length > 0)
    tags = tagList.map((tag, index) => (
      <li className={classes.tag} key={`${slug}-tag-#${index}`}>
        <span>{tag}</span>
      </li>
    ))
  const handleLike = favorited ? removeLike : putLike
  return (
    <li className={classes.ArticleCard}>
      <div className={classes['ArticleCard-header']}>
        <div className={classes['ArticleCard--card-info']}>
          <Link to={`/articles/${slug}`} className={classes['ArticleCard-title']}>
            {title}
          </Link>
          <button
            disabled={token ? false : true}
            className={classes['ArticleCard-btn-like']}
            onClick={() => {
              handleLike(token, slug)
            }}
          >
            <img src={favorited ? heartLiked : heart} alt="icon-like" className={classes['icon-like']} />
            <span>{favoritesCount}</span>
          </button>
          <ul className={classes['tag-list']}>{tags}</ul>
        </div>
        <div className={classes['ArticleCard--author-info']}>
          <div className={classes['ArticleCard--name-and-date']}>
            <span>{author?.username}</span>
            <span>{format(parseISO(createdAt), 'LLLL d, yyyy')}</span>
          </div>
          <img className={classes['ArticleCard--author-avatar']} src={avatar || defaultAvatar} alt="Author avatar" />
        </div>
      </div>
      <p className={classes['ArticleCard-description']}>{description}</p>
    </li>
  )
}

export default ArticleCard
