import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {deleteCase, setConversation} from '../actions/actions'
import ListingCard from '../host/ListingCard'
import Calendar from 'react-calendar';
import {Link} from 'react-router-dom'
import house from '../images/house.png'
import capacity from '../images/bullet-points/capacity.png'
import calendar from '../images/calendar.png'
import profile from '../images/profile.svg'
import case_image from '../images/default_case_img.jpg'

class CaseProfile extends React.Component {

  state = {
    date: new Date()
  }

  setDate = date => this.setState({date})

  onCancel(caseObj){
    fetch(`http://localhost:3000/cases/${this.props.caseObj.id}`,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        this.props.deleteCase(this.props.caseObj)
        alert(response.message)
      }
    })
    .then(this.props.history.push('/cases'))
  }

  createConversation = () =>{
    fetch("http://localhost:3000/conversations", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        sender_id: this.props.currentUser.id,
        recipient_id: this.props.caseObj.user.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.setConversation(response)
    })
    .then(() => this.props.history.push('/message'))
  }

  renderEditandDelete = () => {
    return (
      <div className='edit-delete-buttons'>
        <Link to={`/editcase/${this.props.caseObj.id}`}>Edit</Link>
        <button onClick={() => { if (window.confirm('Are you sure you wish to delete this case?')) this.onCancel(this.props.caseObj) } }>Delete</button>
      </div>
    )
  }

  returnPlacements(status){
    const placements = this.props.caseObj.placements.filter(placement => {
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

  renderLanguages(){
    if (this.props.caseObj.languages.length === 0) {
      return "None specified"
    }
    const languages = this.props.caseObj.languages.map(language => language.language)
    return languages.join(" , ")
  }

  renderCreationDate(){
    const creationDate = new Date(this.props.caseObj.created_at)
    return (creationDate.getMonth() + 1) + "/" + creationDate.getDate() + "/" + creationDate.getFullYear()
  }

  renderCalendar(){
    return (
      <div className="calendar">
        {this.props.userType === 'host' ? null : this.renderEditandDelete()}
        <p className='booked-marker'>Approved Booking</p>
        <Calendar className="calendar" selectRange onChange={this.setDate} value={this.state.date} tileClassName={this.tileClassName}/>
      </div>
    )
  }

  renderMessageCaseworker(){
    return (
      <div className='caseworker-info-container'>
        <h4>Caseworker Name:</h4>
        <img src={this.props.caseObj.user.profile_image ? this.props.caseObj.user.profile_image : profile}/>
        <h5>{this.props.caseObj.user.name}</h5>
        <button onClick={this.createConversation}>MESSAGE CASEWORKER</button>
      </div>
    )
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
      <div className="case-profile-info">
          <div className='case-profile-title'>
            <h3>Case ID # {this.props.caseObj.id}</h3>
            <h5>Guest Type: {this.props.caseObj.guest_type}</h5>
          </div>
          <div className="case-profile-main-info">
              <div className="case-profile-pic">
                <img src={this.props.caseObj.image_url ? this.props.caseObj.image_url : case_image}/>
              </div>
              <div className="calendar-container">
                {this.props.userType === 'caseworker' ? this.renderCalendar() : this.renderMessageCaseworker()}
              </div>
          </div>
          <div className="case-profile-info-container">
            <div className="case-profile-additional-info">
              <h6>Description: {this.props.caseObj.special_notes}</h6>
              <p>Languages Spoken at Household: {this.renderLanguages()}</p>
            </div>
            <div className="case-profile-details">
              <div className="case-profile-detail"><img style={{width: '20px'}} src={house}/><p>Household Preference: {this.props.caseObj.household_preference}</p></div>
              <div className="case-profile-detail"><img style={{width: '20px'}} src={capacity}/><p>Number of Members: {this.props.caseObj.num_members}</p></div>
              <div className="case-profile-detail"><img style={{width: '20px'}} src={calendar}/><p>Creation Date: {this.renderCreationDate()}</p></div>
            </div>
          </div>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "allListings", "currentDate"]), {deleteCase, setConversation})(CaseProfile)
