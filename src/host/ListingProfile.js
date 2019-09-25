import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {deleteListing, setConversation} from '../actions/actions'
import {Link} from 'react-router-dom'
import default_profile from '../images/default_profile.png'
import room from '../images/bullet-points/room.png'
import capacity from '../images/bullet-points/capacity.png'
import house from '../images/house.png'
import preference from '../images/bullet-points/preference.png'
import children from '../images/bullet-points/children.png'
import Calendar from 'react-calendar';
import admin from '../images/provisions/admin.png'
import food from '../images/provisions/food.png'
import language from '../images/provisions/language.png'
import legal from '../images/provisions/legal.png'
import transportation from '../images/provisions/transportation.png'
import BookingInfo from './BookingInfo'
import { Gallery, GalleryImage } from 'react-gesture-gallery'


class ListingProfile extends React.Component {

  state = {
    date: new Date(),
    foodHovered: false,
    languageHovered: false,
    adminHovered: false,
    legalHovered: false,
    transHovered: false,
    currentIndex: 0
  }

  setDate = date => this.setState({date})

  onCancel(listing){
    fetch(`http://localhost:3000/listings/${this.props.listing.id}`,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.deleteListing(this.props.listing)
      alert(response.message)
    })
    .then(this.props.history.push('/listings'))
  }

  renderEditDelete(){
    return (
      <div className='edit-delete-buttons'>
        <Link to={`/editlisting/${this.props.listing.id}`}>Edit</Link>
        <button onClick={() => { if (window.confirm('Are you sure you wish to delete this listing?')) this.onCancel(this.props.listing) } }>Delete</button>
      </div>
    )
  }

  renderLanguages(){
    const languages = this.props.listing.languages.map(language => language.language)
    return languages.join(" , ")
  }

  renderProvisions(){
    return this.props.listing.provisions.map(provision => {
      if (provision.provision === 'Food') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({foodHovered: true})}
            onMouseLeave={() => this.setState({foodHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}}
            src={food}/>
            {this.state.foodHovered ? <p style={{position: 'absolute'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Legal Aid') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({legalHovered: true})}
            onMouseLeave={() => this.setState({legalHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={legal}/>
            {this.state.legalHovered ? <p style={{position: 'absolute'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Transportation') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({transHovered: true})}
            onMouseLeave={() => this.setState({transHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={transportation}/>
            {this.state.transHovered ? <p style={{position: 'absolute'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Administrative Aid') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({adminHovered: true})}
            onMouseLeave={() => this.setState({adminHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={admin}/>
            {this.state.adminHovered ? <p style={{position: 'absolute'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Language Practice') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({languageHovered: true})}
            onMouseLeave={() => this.setState({languageHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={language}/>
            {this.state.languageHovered ? <p style={{position: 'absolute'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      }
    })
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
        recipient_id: this.props.listing.user.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.setConversation(response)
    })
    .then(() => this.props.history.push('/message'))
  }

  renderHostInfo = () =>{
    return (
      <div className="listing-profile-host-info">
        <h3>Host Info</h3>
        <p>{this.props.listing.user.name}</p>
        {this.props.listing.user.profile_image ? <img src={this.props.listing.user.profile_image}/> : <img src={default_profile}/>}
        <button onClick={this.createConversation}>MESSAGE HOST</button>
      </div>
    )
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

  renderBookingInfo(){
    return <BookingInfo listing={this.props.listing}/>
  }

  renderCalendar(){
    return (
      <div className="calendar">
        {this.props.userType === 'host' ? this.renderEditDelete() : null}
        <p className='booked-marker'>Booked</p>
        <Calendar className="calendar" selectRange onChange={this.setDate} value={this.state.date} tileClassName={this.tileClassName}/>
      </div>
    )
  }

  renderImages = pictures => {
    return (
      <Gallery index = {this.state.currentIndex}
      onRequestChange={index => this.setState({currentIndex: index})}>
        {pictures.map(picture => {
          return <GalleryImage objectFit="cover" src={picture.image_url}/>
        })}
      </Gallery>
    )
  }

  render(){
    return (
      <div className="listing-profile-info">
        <div className='listing-profile-title'>
          <h3>{this.props.listing.title}</h3>
          <h5>{this.props.listing.address}</h5>
        </div>
        <div className="listing-profile-main-info">
          <div className="listing-profile-pic">
            {this.renderImages(this.props.listing.pictures)}
          </div>
          <div className="calendar-container">
            {this.props.userType === 'host' ? this.renderCalendar() : this.renderBookingInfo()}
          </div>
        </div>
        <div className="listing-profile-info-container">
          <div className="listing-profile-additional-info">
            <h6>Description: {this.props.listing.description}</h6>
            <p>Languages Spoken at Household: {this.renderLanguages()}</p>
            <p>Additional Provisions: {this.renderProvisions()}</p>
          </div>
          <div className="listing-profile-details">
            <div className="listing-profile-detail"><img style={{width: '20px'}} src={room}/><p>Room Type: {this.props.listing.room_type}</p></div>
            <div className="listing-profile-detail"><img style={{width: '20px'}} src={capacity}/><p>Maximum Capacity: {this.props.listing.capacity}</p></div>
            <div className="listing-profile-detail"><img style={{width: '20px'}} src={house}/><p>Household Type: {this.props.listing.household_type}</p></div>
            <div className="listing-profile-detail"><img style={{width: '20px'}} src={preference}/><p>Guest Preference: {this.props.listing.guest_preference}</p></div>
            <div className="listing-profile-detail"><img style={{width: '20px'}} src={children}/><p>{this.props.listing.children ? "OK to host children" : "Currently not accepting children"}</p></div>
          </div>
            {this.props.userType === 'caseworker' ? this.renderHostInfo() : null}
        </div>
      </div>
    )
  }


}

export default connect(generateMSP(["userType", "currentUser"]), {deleteListing, setConversation})(ListingProfile)
