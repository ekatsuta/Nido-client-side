import React from 'react'
import ListingCardContainer from './ListingCardContainer'
import Stats from '../components/Stats'
import Map from '../components/Map'
import {generateMSP} from '../actions/msp_template'
import {connect} from 'react-redux'



class ListingsContainer extends React.Component {
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
      <div className="listings-container">
        {this.props.userType === 'host' ? <Stats data={this.renderStatusData()}/> : null}
        {this.props.userType === 'caseworker' ? <Map history={this.props.history}/> : null}
        <ListingCardContainer history={this.props.history}/>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "placements"]))(ListingsContainer)
