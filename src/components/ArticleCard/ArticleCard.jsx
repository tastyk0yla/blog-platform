import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../img/avatar.jpg'
import heartLiked from '../../img/heart-liked.svg'
import heart from '../../img/heart.svg'
import classes from './ArticleCard.module.scss'

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
    <li className={classes.article_card}>
      <div className={classes.article_card_header}>
        <div className={classes.article_card__card_info}>
          <Link to={`/articles/${slug}`} className={classes.article_card_title}>
            {title}
          </Link>
          <button
            disabled={token ? false : true}
            className={classes.article_card_btn_like}
            onClick={() => {
              handleLike(token, slug)
            }}
          >
            <img src={favorited ? heartLiked : heart} alt="icon-like" className={classes.icon_like} />
            <span>{favoritesCount}</span>
          </button>
          <ul className={classes.tag_list}>{tags}</ul>
        </div>
        <div className={classes.article_card__author_info}>
          <div className={classes.article_card__name_and_date}>
            <span>{author?.username}</span>
            <span>{format(parseISO(createdAt), 'LLLL d, yyyy')}</span>
          </div>
          <img className={classes.article_card__author_avatar} src={avatar || defaultAvatar} alt="Author avatar" />
        </div>
      </div>
      <p className={classes.article_card_description}>{description}</p>
    </li>
  )
}

export default ArticleCard
