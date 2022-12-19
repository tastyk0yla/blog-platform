import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import defaultAvatar from '../../img/avatar.jpg'
import * as actions from '../../redux/actions'
import classes from './Header.module.scss'
const { logo, btn, btn__sign_up, btn__create_article, btn_container, btn__log_out, user_info__container } = classes

const Header = ({ userInfo, getUserInfo, logOut }) => {
  useEffect(() => {
    const token = userInfo.token || localStorage.getItem('token')
    const { isExtended } = userInfo
    if (token) {
      isExtended ? undefined : getUserInfo(token)
    }
  }, [])

  let buttons = (
    <Fragment>
      <button className={btn}>
        <span>
          <Link to="/sign-in">Sign In</Link>
        </span>
      </button>
      <button className={`${btn} ${btn__sign_up}`}>
        <span>
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </button>
    </Fragment>
  )

  if (userInfo.token) {
    buttons = (
      <Fragment>
        <button className={`${btn} ${btn__create_article}`}>
          <Link to="/new-article">Create article</Link>
        </button>
        <Link to="/profile" className={user_info__container}>
          <span>{userInfo.username}</span>
          <img src={userInfo.image || defaultAvatar} alt="Avatar" />
        </Link>
        <button className={`${btn} ${btn__log_out}`} onClick={logOut}>
          <span>Log Out</span>
        </button>
      </Fragment>
    )
  }

  return (
    <header>
      <span className={logo}>
        <Link to="/">Realworld Blog</Link>
      </span>
      <div className={btn_container}>{buttons}</div>
    </header>
  )
}
const mapStateToProps = ({ userInfo }) => {
  return { userInfo }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
