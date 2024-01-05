import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {display: 'none'}

  onClickLogout = () => {
    const {history} = this.props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickExpandMenu = () => {
    this.setState({display: 'flex'})
  }

  collapseMenu = () => {
    this.setState({display: 'none'})
  }

  render() {
    const {tab} = this.props
    const {display} = this.state
    const hiddenMenu =
      display === 'none' ? 'menu-container-md-none' : 'menu-container-md'
    return (
      <>
        <div className="header-container">
          <Link to="/">
            <div className="logo-container">
              <img src="/img/logo.svg" alt="logo" className="logo" />
              <p className="logo-title">Tasty Kitchens</p>
            </div>
          </Link>
          <div className="menu-container">
            <div className="menu-container-lg">
              <ul className="menu-container-list-lg">
                <Link to="/">
                  <li className={tab === 'HOME' ? 'active-item' : 'menu-item'}>
                    Home
                  </li>
                </Link>
                <Link to="/cart">
                  <li className={tab === 'CART' ? 'active-item' : 'menu-item'}>
                    Cart
                  </li>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
            <GiHamburgerMenu
              className="hamburger-menu"
              onClick={this.onClickExpandMenu}
            />
          </div>
        </div>
        <div className={hiddenMenu}>
          <div className="menu-container-list">
            <ul className="menu-container-list-md">
              <Link to="/">
                <li className={tab === 'HOME' ? 'active-item' : 'menu-item'}>
                  Home
                </li>
              </Link>
              <Link to="/cart">
                <li className={tab === 'CART' ? 'active-item' : 'menu-item'}>
                  Cart
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
          <AiFillCloseCircle
            className="close-btn"
            onClick={this.collapseMenu}
          />
        </div>
      </>
    )
  }
}

export default withRouter(Header)
