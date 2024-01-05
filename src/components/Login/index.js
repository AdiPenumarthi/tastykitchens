import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    this.setState({isError: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(response)

    if (response.status === 200) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({isError: true})
    }
  }

  render() {
    const {username, password, isError} = this.state
    return (
      <>
        <div className="login-lg-page">
          <div className="login-container">
            <form
              className="login-form-container"
              onSubmit={this.onSubmitLoginForm}
            >
              <img src="/img/logo.svg" className="logo" alt="logo" />
              <p className="app-title">Tasty Kitchens</p>
              <h5 className="login">Login</h5>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                onChange={this.onChangeUsername}
                value={username}
                id="username"
                className="input"
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={this.onChangePassword}
                id="password"
                className="input"
              />
              {isError && (
                <p className="error-message">
                  Please enter a valid Username & Password
                </p>
              )}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
          <div className="login-side-container">
            <img
              src="/img/login_image.jpg"
              alt="rectangle-img"
              className="login-side-image"
            />
          </div>
        </div>
        <div className="login-md-page">
          <div className="login-md-image">
            <h5 className="login-md">Login</h5>
          </div>
          <form
            className="login-form-container-md"
            onSubmit={this.onSubmitLoginForm}
          >
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              value={username}
              id="username"
              className="input"
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
              id="password"
              className="input"
            />
            {isError && (
              <p className="error-message">
                Please enter a valid Username & Password
              </p>
            )}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
