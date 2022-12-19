import { Spin } from 'antd'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../../redux/actions'
import classes from '../Forms.module.scss'

const EditProfile = ({ formErrors, isFetching, updateUserInfo, userInfo }) => {
  const history = useHistory()
  if (!userInfo.token) history.push('/')

  let useFormObject = { mode: 'onChange' }

  useEffect(() => {
    if (userInfo.username !== undefined) {
      setValue('username', userInfo.username)
      setValue('email', userInfo.email)
      setValue('image', userInfo.image)
    }
  }, [userInfo])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm(useFormObject)

  const onSubmit = (data) => {
    let inputsWithValues = {}
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) inputsWithValues.key = data.key
    }

    if (!isEmpty(inputsWithValues)) updateUserInfo(userInfo.token, data)
  }

  return (
    <div className={classes.forms_wrapper}>
      <span className={classes.forms_title}>Edit Profile</span>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" />
        <span>Username</span>
        <input
          {...register('username', {
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: /^[a-z0-9]{3,20}$/,
              message: 'Username must contain only numbers and letters in any case',
            },
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
          type="text"
          placeholder="Username"
          id="username"
          className={errors?.username?.message ? `${classes.input} ${classes.input__error}` : classes.input}
        />
        {(errors?.username?.message && <span className={classes.err_msg}>{errors?.username?.message}</span>) ||
          (formErrors?.username && <span className={classes.err_msg}>{`Username ${formErrors?.username}`}</span>)}

        <label htmlFor="email" />
        <span>Email address</span>
        <input
          defaultValue={userInfo.email}
          {...register('email', {
            pattern: {
              value:
                // eslint-disable-next-line no-useless-escape
                /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
              message: 'Please, enter valid email!',
            },
          })}
          type="text"
          placeholder="Email address"
          id="email"
          className={errors?.email?.message ? `${classes.input} ${classes.input__error}` : classes.input}
        />
        {(errors?.email?.message && <span className={classes.err_msg}>{errors?.email?.message}</span>) ||
          (formErrors?.email && <span className={classes.err_msg}>{`Email ${formErrors?.email}`}</span>)}

        <label htmlFor="password" />
        <span>New password</span>
        <input
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
          })}
          type="password"
          placeholder="New password"
          id="password"
          className={errors?.password?.message ? `${classes.input} ${classes.input__error}` : classes.input}
        />
        {errors?.password?.message && <span className={classes.err_msg}>{errors?.password?.message}</span>}

        <label htmlFor="image" />
        <span>Avatar image (url)</span>
        <input
          {...register('image', {
            pattern: {
              value:
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
              message: 'Please, enter valid url!',
            },
          })}
          type="text"
          placeholder="Avatar image"
          id="avatar"
          className={errors?.image?.message ? `${classes.input} ${classes.input__error}` : classes.input}
        />
        {errors?.image?.message && <span className={classes.err_msg}>{errors?.image?.message}</span>}
        <button className={classes.btn__submit} type="submit">
          <span>{isFetching ? <Spin size="small" /> : 'Save'}</span>
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ formErrors, userInfo, isFetching }) => {
  return { formErrors, userInfo, isFetching }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
