import React from 'react'
import {connect} from 'react-redux'
import {setUser} from '../actions/actions'
import {generateMSP} from '../actions/msp_template'


class Signup extends React.Component {

  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    userType: ""
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.password === this.state.passwordConfirmation) {
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          userType: this.state.userType
        })
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors){
          alert(response.errors)
        } else {
          this.props.setUser(response)
        }
      })
      .then(() => this.props.history.push('/edit'))
    } else {
      alert("Passwords don't match!")
    }
  }


  render () {
    console.log(this.state)
    return(
      <div className="landingpage">
      <div className="signup-page-container">
        <div className="signup-interface">
          <p>Provide Solutions to Housing Insecurity of Refugees & Asylum Seekers in NYC</p>
          <div className="signup-form-container">
            <form onSubmit={this.handleSubmit} className="signup-form">
              <h3>SIGN UP</h3>
              <select name="userType" onChange={this.handleInput}>
                <option value="" disabled selected hidden>Select your option</option>
                <option name="usertype" value="host">Host</option>
                <option name="usertype" value="caseworker">Caseworker</option>
              </select>
              <input type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
              <input type="text" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email"/>
              <input type="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
              <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleInput} placeholder="Password Confirmation"/>
              <input type="submit" value="SIGNUP"/>
            </form>
          </div>
        </div>
          <div className="login-image">
            <img src="https://images.squarespace-cdn.com/content/v1/568d61352399a30df6251902/1487607951387-6ERHTTYK4T0HYXZXM4IE/ke17ZwdGBToddI8pDm48kOBfPyXLxscNLHS6XC6Yty57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ua2H2IL2bkPlEe1YE4PM2Np2cINJ1KL188NMWlDUGKFcXejQve6EWhtsEXNp5cp4uw/march.jpg?format=1500w" />
          </div>
        </div>

        <div className="about-page">
        <img src="https://www.rescue.org/sites/default/files/styles/window_width_breakpoints_theme_rescue_large_2x/public/hero/1246/hero-image/20090625_nyc_mcohen_146.jpg?itok=7iq4AVpF"/>
        <p className="allhumans">We are all humans</p>
        <p className="deservehome">and DESERVE a home.</p>
      </div>
    </div>
    )
  }
}


export default connect(generateMSP(["userType", "currentUser"]), {
  setUser
})(Signup)
