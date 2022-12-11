import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
const { logo, btn, signUp } = classes

const Header = () => {
  return (
    <header>
      <span className={logo}>
        <Link to="/">Realworld Blog</Link>
      </span>
      <div>
        <button className={btn}>
          <span>Sign In</span>
        </button>
        <button className={`${btn} ${signUp}`}>
          <span>Sign Up</span>
        </button>
      </div>
    </header>
  )
}

export default Header
