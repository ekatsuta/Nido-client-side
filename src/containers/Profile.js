import React from 'react'
import UserProfile from '../components/UserProfile'
import Stats from '../components/Stats'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


function Profile (props) {

  function renderData(){
    const approved = getNumByStatus("approved")
    const pending = getNumByStatus("pending")
    const cancelled = getNumByStatus("cancelled")
    return [approved, pending, cancelled]
  }

  function getNumByStatus(status){
    const placements = props.placements.filter(placement => {
      return placement.status === status
    })
    return placements.length
  }


  return (
    <div className="user-profile-container">
      <UserProfile />
      <div className='profile-stats'><Stats data={renderData()}/></div>
    </div>
  )

}

export default connect(generateMSP(["placements"]))(Profile)
