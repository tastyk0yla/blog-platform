import { useEffect, useState } from 'react'
import classes from './TagListManager.module.scss'

const TagListManager = ({ register, tagList, setValue, resetField }) => {
  let initialTags = [
    { value: '', index: 0 },
    { value: '', index: 1 },
  ]
  const [tagsArray, setTagsArray] = useState(initialTags)

  const generateId = (index) => index + Math.floor(10 * Math.random() * Math.random() * Date.now())

  const deleteTag = (id) => {
    resetField(`tag${id}`)
    const tags = tagsArray.reduce((acc, tag) => {
      if (tag.index === id) return acc
      acc.push(tag)
      return acc
    }, [])
    setTagsArray(tags)
  }

  const addTag = () => {
    setTagsArray([...tagsArray, { value: '', index: generateId(tagsArray.length) }])
  }

  let tagListArray = tagsArray.reduce((acc, tag) => {
    acc.push(
      <li className={classes.tag} key={tag.index}>
        <label htmlFor={`tag${tag.index}`}></label>
        <input
          {...register(`tag${tag.index}`)}
          className={classes.input}
          type="text"
          placeholder="Tag"
          id={`tag${tag.index}`}
          form="manageArticle"
        />
        <button
          className={`${classes.btn_delete}`}
          onClick={(event) => {
            event.preventDefault()
            deleteTag(tag.index)
          }}
        >
          <span>Delete</span>
        </button>
      </li>
    )
    return acc
  }, [])

  useEffect(() => {
    if (tagList?.length > 0) {
      initialTags = tagList.reduce((acc, tag, index) => {
        acc.push({ value: tag, index: generateId(index) })
        return acc
      }, [])
      if (initialTags.length === 1) initialTags = [...initialTags, { value: '', index: 0 }]
    }
    setTagsArray(initialTags)
  }, [])

  useEffect(() => {
    tagsArray.forEach((tag) => {
      tag.value && setValue(`tag${tag.index}`, tag.value)
    })
  }, [tagsArray])

  return (
    <div className={classes.tags}>
      {tagListArray?.length > 0 ? (
        <ul>
          <span>Tags</span>
          {tagListArray}
        </ul>
      ) : null}
      <button
        className={`${classes.btn_add}`}
        onClick={(event) => {
          event.preventDefault()
          addTag()
        }}
      >
        <span>Add tag</span>
      </button>
    </div>
  )
}

export default TagListManager
