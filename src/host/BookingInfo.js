import React from 'react'
import CaseCard from '../caseworker/CaseCard'
import Calendar from 'react-calendar';
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {addPlacementToCase} from '../actions/actions'

class BookingInfo extends React.Component {

  state = {
    date: new Date(),
    caseId: (this.props.currentCase ? this.props.currentCase.id : null),
    requestSubmitted: false,
    focused: null,
    bookedDates: [],
    showRequestButton: true
  }

  returnBookedDates(){

    const placements = this.props.listing.placements.filter(placement => {
      return placement.status === 'approved'
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

  setDate = date => this.setState({date})

  handleInput = event => {
    this.setState({
      caseId: event.target.value
    }, () => this.checkPendingRequest())
  }


  createPlacement = event => {
    event.preventDefault()

    fetch("http://localhost:3000/requestPlacement", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        listing_id: this.props.listing.id,
        case_id: this.state.caseId,
        startDate: String(new Date(this.state.date[0])),
        endDate: String(new Date(this.state.date[1]))
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        alert("Request submitted")
        this.props.addPlacementToCase(response)
        this.setState({
          showRequestButton: false
        })
      }
    })
  }

  //need to update listing in Redux state

  renderCases(){
    return this.props.cases.map(caseObj => {
      return <option value={caseObj.id}>{caseObj.id}</option>
    })
  }

  tileDisabled = ({activeStartDate, date, view }) => {
    const bookedDates = this.returnBookedDates()

    if (!bookedDates){
      return (Date.parse(date) < Date.parse(this.props.currentDate))
    } else {
      return bookedDates.some(period => {
        const fromDate = Date.parse(period[0])
        const toDate = Date.parse(period[1])

        return (Date.parse(date) <= toDate && Date.parse(date) >=fromDate) || (Date.parse(date) < Date.parse(this.props.currentDate))
      })
    }
  }

  returnPlacements(status){
    const foundCase = this.props.cases.find(caseObj => caseObj.id === parseInt(this.state.caseId))

    const placements = foundCase.placements.filter(placement => {
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
    if (this.state.caseId) {
      const bookedDates = this.returnPlacements("approved")
      if (bookedDates) {
        const booked = bookedDates.some(period => {
          const fromDate = Date.parse(period[0])
          const toDate = Date.parse(period[1])
          return Date.parse(date) <= toDate && Date.parse(date) >=fromDate
        })
        return booked ? "approved" : null
      } else {
        return false
      }
    } else {
      return false
    }
  }

  checkPendingRequest(){
    const foundCase = this.props.cases.find(caseObj => caseObj.id === parseInt(this.state.caseId))
    if (foundCase) {
      const foundPlacementForListing = foundCase.placements.find(placement => {
        return placement.listing_id === this.props.listing.id
      })
      if (foundPlacementForListing){
        if (foundPlacementForListing.status === 'pending') {
          this.setState({
            showRequestButton: false
          })
        } else {
          this.setState({
            showRequestButton: true
          })
        }
      } else {
        this.setState({
          showRequestButton: true
        })
      }
    }
  }

  renderMultipleCases(){
    return (
      <select onChange={this.handleInput}>
        <option value="" disabled selected hidden>Select your case</option>
        {this.renderCases()}
      </select>
    )
  }


  render() {
    return (
      <div className="booking-container">
        {this.state.showRequestButton ?
          <button className="request-button" onClick={this.createPlacement}>REQUEST PLACEMENT</button> :
          "REQUEST PENDING"}
        {this.props.currentCase ?
          <p>Current Case #:{this.props.currentCase.id}</p> :
          this.renderMultipleCases()}
        <Calendar className="calendar"
          selectRange onChange={this.setDate}
          value={this.state.date}
          tileDisabled={this.tileDisabled}
          tileClassName={this.tileClassName}
        />
        <p className='booked-marker'>Approved</p>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "cases", "currentCase", "currentDate"]), {addPlacementToCase})(BookingInfo)
