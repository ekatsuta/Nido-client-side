import React from 'react'
import ListingCardContainer from './ListingCardContainer'
import Stats from '../components/Stats'
import Map from '../components/Map'
import {generateMSP} from '../actions/msp_template'
import {connect} from 'react-redux'


function ListingsContainer (props) {

  function renderStatusData(){
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
    <div className="listings-container">
      {props.userType === 'host' ? <Stats data={renderStatusData()}/> : null}
      {props.userType === 'caseworker' ? <Map history={props.history}/> : null}
      <ListingCardContainer history={props.history}/>
    </div>
  )

}

export default connect(generateMSP(["userType", "placements"]))(ListingsContainer)
