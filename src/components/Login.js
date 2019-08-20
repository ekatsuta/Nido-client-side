import React from 'react'
import { connect } from 'react-redux'
import { setUser, loadListings, loadCases, toggleLoad } from '../actions/actions'
import legal from '../images/legal.png'
import house from '../images/house.png'
import process from '../images/process.png'
import stats from '../images/stats.png'



class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  componentDidMount() {
    this.props.loadListings()
    this.props.loadCases()

    window.scrollTo(0, 0)
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.toggleLoad()
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
        this.props.toggleLoad()
        this.props.history.push('/login')
      } else {
        this.props.setUser(response)
        this.props.history.push('/home')
      }
    })


  }

  render () {
    return(
      <div className="landingpage">
      <div className="login-page-container">
        <div className="login-interface">
          <p>Provide Solutions to Housing Insecurity of Refugees & Asylum Seekers in NYC</p>
          <div className="login-form-container">
            <form onSubmit={this.handleSubmit} className="login-form">
              <h3>LOGIN</h3>
              <label>USERNAME</label>
              <input type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
              <label>PASSWORD</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
              <input type="submit" value="LOGIN"/>
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
      <div className="info-on-issue">
        <h3>Making it easier for caseworkers representing home-seekers to find the perfect match</h3>
        <div className="what-we-do-container">
        <div className="what-we-do">
          <img style={{width: '50px'}}src={house}/>
          <h5>Community housing network to offer safe, appropriate temporary homes for insecurely-housed refugees and asylum seekers</h5>
        </div>
        <div className="what-we-do">
          <img style={{width: '50px'}}src={legal}/>
          <h5>Provide temporary addresses for legal paperwork</h5>
        </div>
        <div className="what-we-do">
          <img style={{width: '50px'}}src={process}/>
          <h5>Help refugees get back on track to rebuilding their lives, culturally assimilating to the new community and earning a living wage</h5>
        </div>
        </div>
      </div>
      <div className='about-stats'>
        <div className='refugee-info'>
          <p>Refugee admission cap enforced by the government has significantly decreased the number of refugees that can be resettled - this creates a problem for the remaining families and individuals. In 2016, the US admitted 85,000 refugees - the cap is now set at 30,000 for 2019. </p>
        </div>
        <div className='refugee-stats'>
        <img src={stats}/>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(null, {setUser, loadListings, loadCases, toggleLoad})(Login)
