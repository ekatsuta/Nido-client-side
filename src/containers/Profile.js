import React from 'react'
import UserProfile from '../components/UserProfile'
import Stats from '../components/Stats'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


class Profile extends React.Component {

  renderData(){
    const approved = this.getNumByStatus("approved")
    const pending = this.getNumByStatus("pending")
    const cancelled = this.getNumByStatus("cancelled")
    return [approved, pending, cancelled]
  }

  getNumByStatus(status){
    const placements = this.props.placements.filter(placement => {
      return placement.status === status
    })
    return placements.length
  }

  render(){
    return (
      <div>
        <UserProfile />
        <div className='profile-stats'><Stats data={this.renderData()}/></div>
      </div>
    )
  }
}

export default connect(generateMSP(["currentUser", "placements"]))(Profile)
