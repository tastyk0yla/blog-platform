import classes from './TagList.module.scss'

const TagList = ({ tagList, slug }) => {
  let tags = []
  if (tagList?.length > 0)
    tags = tagList.map((tag, index) => (
      <li className={classes.tag} key={`${slug}-tag-#${index}`}>
        <span>{tag}</span>
      </li>
    ))

  return <ul className={classes.tag_list}>{tags}</ul>
}

export default TagList
