import classes from '../../Forms.module.scss'

const InputUsername = ({ register, errors, formErrors }) => {
  return (
    <>
      <label htmlFor="username" />
      <span>Username</span>
      <input
        {...register('username', {
          required: 'Username is required!',
          pattern: {
            // eslint-disable-next-line no-useless-escape
            value: /^[a-zA-Z0-9]{3,20}$/,
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
    </>
  )
}

export default InputUsername
