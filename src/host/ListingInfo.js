import React from 'react'
import CaseCard from '../caseworker/CaseCard'
import Calendar from 'react-calendar';
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class ListingInfo extends React.Component{

  state = {
    date: new Date(),
  }

  setDate = date => this.setState({date})

  renderCaseCard(placementsArr){
    return placementsArr.map(placement => {
      const caseObj = this.props.allCases.find(caseInstance => {
        return caseInstance.id === placement.case_id
      })
      return <CaseCard caseObj={caseObj} placement={placement}/>
    })
  }

  renderPendingRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'pending'
    })
    return this.renderCaseCard(filteredPlacements)
  }

  renderApprovedRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) > Date.parse(this.props.currentDate)
    })
    return this.renderCaseCard(filteredPlacements)
  }

  renderPastRequest(){
    const filteredPlacements = this.props.listing.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) < Date.parse(this.props.currentDate)
    })
    return this.renderCaseCard(filteredPlacements)
  }

  returnPlacements(status){
    const placements = this.props.listing.placements.filter(placement => {
      return placement.status === status
    })

    if (placements.length === 0) {
      return null
    } else {
      const bookedPeriods = placements.map(placement => {
        const period = placement.period.split(",")
        const startDate = new Date(period[0])
        const endDate = new Date(period[1])
        return [startDate, endDate]
      })
      return bookedPeriods
    }
  }


  tileClassName = ({ date, view }) =>{
    const bookedDates = this.returnPlacements("approved")

    if (bookedDates) {
      const booked = bookedDates.some(period => {
        const fromDate = Date.parse(period[0])
        const toDate = Date.parse(period[1])
        return Date.parse(date) <= toDate && Date.parse(date) >=fromDate
      })
      return booked ? "booked" : null
    } else {
      return false
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
        <div className="calendar">
          <p className='booked-marker'>Booked</p>
          <Calendar className="calendar" selectRange onChange={this.setDate} value={this.state.date} tileClassName={this.tileClassName}/>
        </div>
      </div>
    )
  }
}



export default connect(generateMSP(["allCases", "currentDate"]))(ListingInfo)
