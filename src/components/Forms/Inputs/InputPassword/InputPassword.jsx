import classes from '../../Forms.module.scss'

const InputPassword = ({ register, errors, formErrors, isNew }) => {
  return (
    <>
      <label htmlFor="password" />
      <span>{isNew ? 'New password' : 'Password'}</span>
      <input
        {...register('password', {
          required: isNew ? false : 'Password is required',
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
          errors?.password?.message || formErrors['email or password']
            ? `${classes.input} ${classes.input__error}`
            : classes.input
        }
      />
      {errors?.password?.message && <span className={classes.err_msg}>{errors?.password?.message}</span>}
    </>
  )
}

export default InputPassword
