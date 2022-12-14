import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import classes from '../ArticleForms.module.scss'
import * as actions from '../../../redux/actions'

const NewArticle = ({ isFetching, article, toggleFetching, createArticle, userInfo }) => {
  useEffect(() => {
    toggleFetching(false)
  }, [])

  const { token } = userInfo
  const history = useHistory()
  if (!token) history.push('/')
  if (article.redirectIsNeeded) history.push(`/articles/${article.slug}`)

  const [tagIds, setTagIds] = useState([1, 2])
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  const deleteTag = (tag) => {
    const ids = tagIds.reduce((acc, id) => {
      if (tag === id) return acc
      acc.push(id)
      return acc
    }, [])
    setTagIds(ids)
  }

  const addTag = () => {
    const lastId = tagIds.slice(-1)
    setTagIds((tagIds) => [...tagIds, lastId + 1])
  }

  const onSubmit = (data) => {
    createArticle(token, data)
  }

  let tagList = tagIds.reduce((acc, id) => {
    acc.push(
      <li className={classes.tag} key={id}>
        <label htmlFor={`tag${id}`}></label>
        <input
          {...register(`tag${id}`)}
          className={classes.input}
          type="text"
          placeholder="Tag"
          id={`tag${id}`}
          form="newArticle"
        />
        {errors[`tag${id}`]?.message && <span className={classes.err_msg}>{errors[`tag${id}`]?.message}</span>}
        <button
          className={`${classes.btn} ${classes.btn_delete}`}
          onClick={(event) => {
            event.preventDefault()
            deleteTag(id)
          }}
        >
          <span>Delete</span>
        </button>
      </li>
    )
    return acc
  }, [])

  const tags = (
    <div className={classes.tags}>
      {tagList.length > 0 ? (
        <ul>
          <span>Tags</span>
          {tagList}
        </ul>
      ) : null}
      <button
        className={`${classes.btn} ${classes.btn_add}`}
        onClick={(event) => {
          event.preventDefault()
          addTag()
        }}
      >
        <span>Add tag</span>
      </button>
    </div>
  )

  return (
    <div className={classes.article_forms_wrapper}>
      <span className={classes.article_forms_title}>Create new article</span>
      <form onSubmit={handleSubmit(onSubmit)} id="newArticle">
        <label htmlFor="title"></label>
        <span>Title</span>
        <input
          {...register('title', {
            required: 'Title is required!',
          })}
          type="text"
          id="title"
          className={errors?.title?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
          placeholder="Title"
        />
        {errors?.title?.message && <span className={classes.err_msg}>{errors?.title?.message}</span>}

        <label htmlFor="description"></label>
        <span>Short description</span>
        <input
          {...register('description', {
            required: 'Short description is required!',
          })}
          type="text"
          id="description"
          className={errors?.description?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
          placeholder="Short description"
        />
        {errors?.description?.message && <span className={classes.err_msg}>{errors?.description?.message}</span>}

        <label htmlFor="text"></label>
        <span>Text</span>
        <textarea
          {...register('text', {
            required: 'Text is required!',
          })}
          className={errors?.text?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
          id="text"
          cols="30"
          rows="6"
          placeholder="Text"
        ></textarea>
        {errors?.text?.message && <span className={classes.err_msg}>{errors?.text?.message}</span>}

        {tags}

        <button type="submit" className={`${classes.btn} ${classes.btn_save}`}>
          <span>{isFetching ? <Spin size="small" /> : 'Send'}</span>
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ isFetching, article, userInfo }) => {
  return { isFetching, article, userInfo }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
