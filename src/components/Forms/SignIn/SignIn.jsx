import { Spin } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../../redux/actions'
import classes from '../Forms.module.scss'
import { InputEmail } from '../Inputs/InputEmail'
import { InputPassword } from '../Inputs/InputPassword'

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
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    logIn(data)
  }

  return (
    <div className={classes.forms_wrapper}>
      <span className={classes.forms_title}>Sign In</span>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputEmail register={register} errors={errors} formErrors={formErrors} />
        <InputPassword register={register} errors={errors} formErrors={formErrors} />
        <button className={`${classes.btn__submit} ${classes.btn__submit_login}`} type="submit">
          <span>{isFetching ? <Spin size="small" /> : 'Login'}</span>
        </button>
        <span className={classes.forms_footer}>
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
