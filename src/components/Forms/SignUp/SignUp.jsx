import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { Spin } from 'antd'
import classes from '../Forms.module.scss'
import * as actions from '../../../redux/actions'

const SignUp = ({ formErrors, registration, toggleFetching, userInfo, isFetching }) => {
  const history = useHistory()
  if (userInfo.token) {
    history.push('/')
  }

  useEffect(() => {
    toggleFetching(false)
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    registration(data)
  }

  return (
    <div className={classes.forms_wrapper}>
      <span className={classes.forms_title}>Create new account</span>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" />
        <span>Username</span>
        <input
          {...register('username', {
            required: 'Username is required!',
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
          className={errors?.username?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
        />
        {(errors?.username?.message && <span className={classes.err_msg}>{errors?.username?.message}</span>) ||
          (formErrors?.username && <span className={classes.err_msg}>{formErrors?.username}</span>)}

        <label htmlFor="email" />
        <span>Email address</span>
        <input
          {...register('email', {
            required: 'Email is required!',
            pattern: {
              value:
                // eslint-disable-next-line no-useless-escape
                /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
              message: 'Please, enter valid email!',
            },
          })}
          type="email"
          placeholder="Email address"
          id="email"
          className={errors?.email?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
        />
        {(errors?.email?.message && <span className={classes.err_msg}>{errors?.email?.message}</span>) ||
          (formErrors?.email && <span className={classes.err_msg}>{formErrors?.email}</span>)}
        <label htmlFor="password" />
        <span>Password</span>
        <input
          {...register('password', {
            required: 'Password is required',
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
          placeholder="Password"
          id="password"
          className={errors?.password?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
        />
        {errors?.password?.message && <span className={classes.err_msg}>{errors?.password?.message}</span>}
        <label htmlFor="password-repeat" />
        <span>Repeat Password</span>
        <input
          {...register('passwordRepeat', {
            required: 'Password is required!',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
            validate: (input) => {
              if (input === getValues('password')) return true
              return 'Passwords must match'
            },
          })}
          type="password"
          placeholder="Password"
          id="password-repeat"
          className={errors?.passwordRepeat?.message ? `${classes.input} ${classes['input--error']}` : classes.input}
        />
        {errors?.passwordRepeat?.message && <span className={classes.err_msg}>{errors?.passwordRepeat?.message}</span>}
        <div className={classes.divider}></div>

        <label className={classes['label-with-checkbox']} htmlFor="checkbox">
          <input
            {...register('checkbox', {
              required: true,
            })}
            type="checkbox"
            id="checkbox"
          />
          <span
            className={errors?.checkbox ? `${classes.checkbox} ${classes['checkbox--err']}` : classes.checkbox}
          ></span>
          <span>I agree to the processing of my personal information</span>
        </label>
        <button className={classes.btn__submit} type="submit">
          <span>{isFetching ? <Spin size="small" /> : 'Create'}</span>
        </button>
        <span className={classes['forms-footer']}>
          Already have an account? <Link to="/sign-in"> Sign In.</Link>
        </span>
      </form>
    </div>
  )
}

const mapStateToProps = ({ formErrors, userInfo, isFetching }) => {
  return { formErrors, userInfo, isFetching }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
