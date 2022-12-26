import { Button, Result, Spin } from 'antd'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions'
import { TagListManager } from '../TagListManager'
import classes from './ManageArticle.module.scss'

const ManageArticle = ({
  isFetching,
  slug,
  getAnArticle,
  userInfo,
  article,
  updateArticle,
  createArticle,
  toggleFetching,
  isEditing,
  successfullyModified,
  toggleSuccessfullyModified,
  toggleEditing,
}) => {
  const history = useHistory()
  if (!userInfo.token) history.push('/')

  const setFormValues = () => {
    if (isEditing && !isEmpty(article)) {
      setValue('title', article.title)
      setValue('description', article.description)
      setValue('text', article.body)
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    resetField,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    isEditing ? updateArticle(userInfo.token, slug, data) : createArticle(userInfo.token, data)
  }

  const succesMessage = (
    <Result
      status="success"
      title="Success!"
      subTitle={'Want to check out a new article?'}
      extra={[
        <Button
          type="primary"
          key="articles"
          onClick={() => {
            history.push(`/articles/${slug || article.slug}`)
          }}
        >
          Go to article
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            history.push('/')
          }}
        >
          Go to articles
        </Button>,
      ]}
    />
  )

  let element = (
    <>
      <span className={classes.article_forms_title}>{isEditing ? 'Edit article ' : 'Create new article'}</span>
      <form onSubmit={handleSubmit(onSubmit)} id="manageArticle">
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

        <TagListManager register={register} tagList={article.tagList} setValue={setValue} resetField={resetField} />

        <button type="submit" className={`${classes.btn} ${classes.btn_save}`}>
          <span>{isFetching ? <Spin size="small" /> : 'Send'}</span>
        </button>
      </form>
    </>
  )

  useEffect(() => {
    isEditing && isEmpty(article) ? getAnArticle(slug, userInfo.token) : toggleFetching(false)
    if (isEditing && !isEmpty(article) && !successfullyModified) setFormValues()
  }, [])

  useEffect(() => {
    if (!successfullyModified) setFormValues()
  }, [article])

  useEffect(() => {
    return () => {
      toggleSuccessfullyModified(false)
      toggleEditing(false)
    }
  }, [])

  if (successfullyModified) element = succesMessage

  return <div className={classes.article_forms_wrapper}>{element}</div>
}

const mapStateToProps = ({ isFetching, article, userInfo, isEditing, successfullyModified }) => {
  return { isFetching, article, userInfo, isEditing, successfullyModified }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageArticle)
