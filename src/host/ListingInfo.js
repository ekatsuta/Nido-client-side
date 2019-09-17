import React from 'react'
import CaseCard from '../caseworker/CaseCard'

import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class ListingInfo extends React.Component{




  renderCaseCard(placementsArr){
    return placementsArr.map(placement => {
      const caseObj = this.props.allCases.find(caseInstance => {
        return caseInstance.id === placement.case_id
      })
      return <CaseCard history={this.props.history} caseObj={caseObj} placement={placement}/>
    })
  }

  renderPendingRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'pending'
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return this.renderCaseCard(filteredPlacements)
    }
  }

  renderApprovedRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) > Date.parse(this.props.currentDate)
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return this.renderCaseCard(filteredPlacements)
    }
  }

  renderPastRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) < Date.parse(this.props.currentDate)
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return this.renderCaseCard(filteredPlacements)
    }
  }





  render(){
    return (
      <div className='listinginfo-container'>
        <div className="pending-approved-past-container">
          <div className='pending-lists'>
            <h4>PENDING REQUESTS:</h4>
            {this.renderPendingRequest()}
          </div>
          <div className='approved-lists'>
            <h4>APPROVED REQUESTS:</h4>
            {this.renderApprovedRequest()}
          </div>
          <div className='pending-lists'>
            <h4>PAST REQUESTS:</h4>
            {this.renderPastRequest()}
          </div>
        </div>
      </div>
    )
  }
}



export default connect(generateMSP(["allCases", "currentDate"]))(ListingInfo)
