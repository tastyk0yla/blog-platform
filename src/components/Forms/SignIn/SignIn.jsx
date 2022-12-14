import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { Spin } from 'antd'
import classes from '../Forms.module.scss'
import * as actions from '../../../redux/actions'

const SignIn = ({ formErrors, toggleFetching, userInfo, isFetching, logIn }) => {
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
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    logIn(data)
  }

  return (
    <div className={classes.forms_wrapper}>
      <span className={classes.forms_title}>Sign In</span>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          className={
            errors?.email?.message || formErrors['email or password']
              ? `${classes.input} ${classes['input--error']}`
              : classes.input
          }
        />
        {(errors?.email?.message && <span className={classes.err_msg}>{errors?.email?.message}</span>) ||
          (formErrors['email or password'] && (
            <span className={classes.err_msg}>{`Email or password ${formErrors['email or password']}`}</span>
          ))}
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
          className={
            errors?.email?.message || formErrors['email or password']
              ? `${classes.input} ${classes['input--error']}`
              : classes.input
          }
        />
        {errors?.password?.message && <span className={classes.err_msg}>{errors?.password?.message}</span>}

        <button className={`${classes.btn__submit} ${classes.btn__submit_login}`} type="submit">
          <span>{isFetching ? <Spin size="small" /> : 'Login'}</span>
        </button>
        <span className={classes['forms-footer']}>
          Don’t have an account? <Link to="/sign-up"> Sign Up.</Link>
        </span>
      </form>
    </div>
  )
}

const mapStateToProps = ({ formErrors, userInfo, isFetching }) => {
  return { formErrors, userInfo, isFetching }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

//loh@loh.com
