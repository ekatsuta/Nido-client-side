import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import profile from '../images/profile.svg'
import request from '../images/request.svg'
import listing from '../images/listing.svg'
import caseImg from '../images/caseImg.svg'
import {resetCase} from '../actions/actions'


class UserPage extends React.Component {

  componentDidMount(){
    this.props.resetCase()
  }

  renderNewPending(){
    const newPending = this.props.placements.filter(placement => {
      return placement.checked === false
    })

    return (
      <div className="speech-bubble blink_me">{newPending.length}</div>
    )
  }

  checkPending(){
    const newPending = this.props.placements.filter(placement => {
      return placement.checked === false
    })

    return newPending.length
  }

  render(){

      if (this.props.userType === 'host'){
        return(
          <div className="user-page">
            <Link to="/profile">
            <div className="icon">
              <img src={profile}/>
              <p>PROFILE</p>
            </div>
            </Link>
            <Link to="/listings">
            <div className="icon">
              <img src={listing}/>
              <p>LISTINGS</p>
            </div>
            </Link>
            <Link to="/requests">
            <div className="icon">
              <p>{this.checkPending() === 0 ? null : this.renderNewPending()}</p>
              <img src={request}/>
              <p>REQUESTS</p>
            </div>
            </Link>
          </div>
        )
      }
      if (this.props.userType === 'caseworker') {
        return(
          <div className="user-page">
            <Link to="/profile">
              <div className="icon">
                <img src={profile}/>
                <p>PROFILE</p>
              </div>
            </Link>
            <Link to="/cases">
              <div className="caseicon">
                <img  src={caseImg}/>
                <p>CASES</p>
              </div>
            </Link>
            <Link to="/listings">
              <div className="icon">
                <img src={listing}/>
                <p>LISTINGS</p>
              </div>
            </Link>
          </div>
        )
      }

  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "loaded", "placements"]), {resetCase})(UserPage)
