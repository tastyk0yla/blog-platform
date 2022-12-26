import classes from '../../Forms.module.scss'

const InputPasswordRepeat = ({ register, errors, getValues }) => {
  return (
    <>
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
        className={errors?.passwordRepeat?.message ? `${classes.input} ${classes.input__error}` : classes.input}
      />
      {errors?.passwordRepeat?.message && <span className={classes.err_msg}>{errors?.passwordRepeat?.message}</span>}
      <div className={classes.divider}></div>
    </>
  )
}

export default InputPasswordRepeat
