import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../actions/actions'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import nest from '../images/nest.png'

class Nav extends React.Component {

  logOut =()=>{
    this.props.logout()
    this.props.routerProps.history.push('/login')
  }
  //
  // componentDidMount(){
  //   window.addEventListener('scroll', this.handleScroll)
  // }
  //
  // handleScroll = () => {
  //   const navbar = document.getElementsByClassName('navbar')
  //   if (window.scrollY > 400) {
  //     navbar[0].style.color = "blue"
  //   } else {
  //     navbar[0].style.color = "white"
  //   }
  // }

  renderLoginSignup(){
    return (
      <div className="login-signup-nav">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )
  }

  renderHomeLogout(){
    return (
      <div className="home-logout-nav">
        <Link to="/home">Home</Link>
        <Link to='/message'>
          <p>Message</p>
          {this.props.unreadMessages > 0 ? <div className="unread-messages">{this.props.unreadMessages}</div> : null}
        </Link>
        <button onClick={this.logOut}>Log Out</button>
      </div>
    )
  }

  render(){
    return (
      <div className="navbar" >
        <h3>NIDO</h3>
        {this.props.routerProps.location.pathname === '/login' || this.props.routerProps.location.pathname ==='/signup' ? this.renderLoginSignup() : null}
        {this.props.routerProps.location.pathname !== '/login' && this.props.routerProps.location.pathname !== '/signup'? this.renderHomeLogout() : null}

      </div>
    )
  }

}

export default connect(generateMSP(["unreadMessages"]), {logout})(Nav)
