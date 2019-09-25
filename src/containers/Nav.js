import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../actions/actions'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import nest from '../images/nest.png'

function Nav (props) {

  function logOut (){
    props.logout()
    props.routerProps.history.push('/')
  }

  function renderLoginSignup(){
    return (
      <div className="login-signup-nav">
        <Link to="/">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )
  }

  function renderHomeLogout(){
    return (
      <div className="home-logout-nav">
        <Link to="/home">Home</Link>
        <Link to='/message'>
          <p>Message</p>
          {props.unreadMessages > 0 ? <div className="unread-messages">{props.unreadMessages}</div> : null}
        </Link>
        <button onClick={logOut}>Log Out</button>
      </div>
    )
  }

  return (
    <div className="navbar" >
      <h3>NIDO</h3>
      {props.routerProps.location.pathname === '/' || props.routerProps.location.pathname ==='/signup' ? renderLoginSignup() : null}
      {props.routerProps.location.pathname !== '/' && props.routerProps.location.pathname !== '/signup'? renderHomeLogout() : null}

    </div>
  )


}

export default connect(generateMSP(["unreadMessages"]), {logout})(Nav)
