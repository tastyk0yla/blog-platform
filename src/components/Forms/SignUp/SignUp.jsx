import { Button, Result, Spin } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../../redux/actions'
import classes from '../Forms.module.scss'
import { InputEmail } from '../Inputs/InputEmail'
import { InputPassword } from '../Inputs/InputPassword'
import { InputPasswordRepeat } from '../Inputs/InputPasswordRepeat'
import { InputUsername } from '../Inputs/InputUsername'

const SignUp = ({ formErrors, registration, toggleFetching, userInfo, isFetching }) => {
  const history = useHistory()
  useEffect(() => {
    toggleFetching(false)
  }, [])

  const onSubmit = (data) => {
    registration(data)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'onBlur',
  })

  const signUpForm = (
    <>
      <span className={classes.forms_title}>Create new account</span>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputUsername register={register} errors={errors} formErrors={formErrors} />
        <InputEmail register={register} errors={errors} formErrors={formErrors} />
        <InputPassword register={register} errors={errors} formErrors={formErrors} />
        <InputPasswordRepeat register={register} errors={errors} getValues={getValues} />

        <label className={classes.label_with_checkbox} htmlFor="checkbox">
          <input
            {...register('checkbox', {
              required: true,
            })}
            type="checkbox"
            id="checkbox"
          />
          <span className={errors?.checkbox ? `${classes.checkbox} ${classes.checkbox__err}` : classes.checkbox}></span>
          <span>I agree to the processing of my personal information</span>
        </label>
        <button className={classes.btn__submit} type="submit">
          <span>{isFetching ? <Spin size="small" /> : 'Create'}</span>
        </button>
        <span className={classes.forms_footer}>
          Already have an account? <Link to="/sign-in"> Sign In.</Link>
        </span>
      </form>
    </>
  )

  const succesMsg = (
    <Result
      status="success"
      title="Successfully registered"
      subTitle={`${userInfo.username}, you have successfully registered`}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            history.push('/')
          }}
        >
          Go to articles
        </Button>,
      ]}
    />
  )

  let element = signUpForm

  if (userInfo.token) {
    element = succesMsg
  }

  return <div className={classes.forms_wrapper}>{element}</div>
}

const mapStateToProps = ({ formErrors, userInfo, isFetching }) => {
  return { formErrors, userInfo, isFetching }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
