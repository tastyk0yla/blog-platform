import classes from '../../Forms.module.scss'

const InputEmail = ({ register, errors, formErrors }) => {
  return (
    <>
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
            ? `${classes.input} ${classes.input__error}`
            : classes.input
        }
      />
      {(errors?.email?.message && <span className={classes.err_msg}>{errors?.email?.message}</span>) ||
        (formErrors['email or password'] && (
          <span className={classes.err_msg}>{`Email or password ${formErrors['email or password']}`}</span>
        ))}
    </>
  )
}

export default InputEmail
