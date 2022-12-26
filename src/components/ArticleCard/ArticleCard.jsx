import { ArticleHeader } from '../ArticleHeader'
import classes from './ArticleCard.module.scss'

const ArticleCard = ({ userInfo, article }) => {
  return (
    <li className={classes.article_card}>
      <ArticleHeader isPreview={true} userInfo={userInfo} article={article} />
    </li>
  )
}

export default ArticleCard
