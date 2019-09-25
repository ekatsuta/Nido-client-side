import React from 'react'
import CaseCard from '../caseworker/CaseCard'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

function ListingInfo (props) {

  function renderCaseCard(placementsArr){
    return placementsArr.map(placement => {
      const caseObj = props.allCases.find(caseInstance => {
        return caseInstance.id === placement.case_id
      })
      return <CaseCard history={props.history} caseObj={caseObj} placement={placement}/>
    })
  }

  function renderPendingRequest(){
    const filteredPlacements = props.listing.placements.filter(placement => {
      return placement.status === 'pending'
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return renderCaseCard(filteredPlacements)
    }
  }

  function renderApprovedRequest(){
    const filteredPlacements = props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) > Date.parse(props.currentDate)
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return renderCaseCard(filteredPlacements)
    }
  }

  function renderPastRequest(){
    const filteredPlacements = props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) < Date.parse(props.currentDate)
    })
    if (filteredPlacements.length === 0) {
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    } else {
      return renderCaseCard(filteredPlacements)
    }
  }


  return (
    <div className='listinginfo-container'>
      <div className="pending-approved-past-container">
        <div className='pending-lists'>
          <h4>PENDING REQUESTS:</h4>
          {renderPendingRequest()}
        </div>
        <div className='approved-lists'>
          <h4>APPROVED REQUESTS:</h4>
          {renderApprovedRequest()}
        </div>
        <div className='pending-lists'>
          <h4>PAST REQUESTS:</h4>
          {renderPastRequest()}
        </div>
      </div>
    </div>
  )

}



export default connect(generateMSP(["allCases", "currentDate"]))(ListingInfo)
