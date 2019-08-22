import React from 'react'
import Stats from '../components/Stats'
import RequestCardContainer from './RequestCardContainer'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class RequestsContainer extends React.Component {

  renderStatusData(){
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
      <div className="requests-container">
        <Stats data={this.renderStatusData()}/>
        <RequestCardContainer history={this.props.history}/>
      </div>
    )
  }
}

export default connect(generateMSP(["placements"]))(RequestsContainer)
