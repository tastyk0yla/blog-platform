import { Spin } from 'antd'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../../../redux/actions'
import classes from '../Forms.module.scss'
import { InputEmail } from '../Inputs/InputEmail'
import { InputPassword } from '../Inputs/InputPassword'
import { InputUrl } from '../Inputs/InputUrl'
import { InputUsername } from '../Inputs/InputUsername'

const EditProfile = ({ formErrors, isFetching, updateUserInfo, userInfo }) => {
  const history = useHistory()
  if (!userInfo.token) history.push('/')

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
  } = useForm({ mode: 'onBlur' })

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
        <InputUsername register={register} errors={errors} formErrors={formErrors} />
        <InputEmail register={register} errors={errors} formErrors={formErrors} />
        <InputPassword register={register} errors={errors} formErrors={formErrors} isNew={true} />
        <InputUrl register={register} errors={errors} />
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
