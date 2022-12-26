import classes from '../../Forms.module.scss'

const InputUrl = ({ register, errors }) => {
  return (
    <>
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
    </>
  )
}

export default InputUrl
