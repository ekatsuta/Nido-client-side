import React from 'react'
import Stats from '../components/Stats'
import RequestCardContainer from './RequestCardContainer'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

function RequestsContainer (props){

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
    <div className="requests-container">
      <Stats data={renderStatusData()}/>
      <RequestCardContainer history={props.history}/>
    </div>
  )

}

export default connect(generateMSP(["placements"]))(RequestsContainer)
