import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import classes from '../ArticleForms.module.scss'
import * as actions from '../../../redux/actions'

const EditArticle = ({ isFetching, slug, getAnArticle, userInfo, article, updateArticle }) => {
  const history = useHistory()
  if (!userInfo.token) history.push('/')
  if (article.redirectIsNeeded) history.push(`/articles/${article.slug}`)

  const [tagsArray, setTagsArray] = useState([])

  useEffect(() => {
    getAnArticle(slug)
  }, [])

  useEffect(() => {
    if (article.slug === slug) {
      let initialTags = [
        { value: '', index: 0 },
        { value: '', index: 1 },
      ]
      if (article.tagList.length > 0) {
        initialTags = article.tagList.reduce((acc, tag, index) => {
          acc.push({ value: tag, index })
          return acc
        }, [])
      }
      setTagsArray(initialTags)
      setValue('title', article.title)
      setValue('description', article.description)
      setValue('text', article.body)
      tagsArray.forEach((tag) => {
        if (tag.value) setValue(`tag${tag.index}`, tag.value)
      })
    }
  }, [article])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
  })

  const deleteTag = (id) => {
    const tags = tagsArray.reduce((acc, tag) => {
      if (tag.index === id) return acc
      acc.push(tag)
      return acc
    }, [])
    setTagsArray(tags)
  }

  const addTag = () => {
    setTagsArray([...tagsArray, { value: '', index: Math.floor(10 * Math.random() * Math.random() * Date.now()) }])
  }

  const onSubmit = (data) => {
    console.log(data)
    updateArticle(userInfo.token, slug, data)
  }

  let tagList = tagsArray.reduce((acc, tag) => {
    acc.push(
      <li className={classes.tag} key={tag.index}>
        <label htmlFor={`tag${tag.index}`}></label>
        <input
          {...register(`tag${tag.index}`)}
          className={classes.input}
          type="text"
          placeholder="Tag"
          id={`tag${tag.index}`}
          form="newArticle"
        />
        {errors[`tag${tag.index}`]?.message && (
          <span className={classes.err_msg}>{errors[`tag${tag.index}`]?.message}</span>
        )}
        <button
          className={`${classes.btn} ${classes.btn_delete}`}
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
      <span className={classes.article_forms_title}>Edit article</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)
