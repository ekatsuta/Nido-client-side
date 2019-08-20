import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {deleteListing, setConversation} from '../actions/actions'
import {Link} from 'react-router-dom'
import default_profile from '../images/default_profile.png'


class ListingProfile extends React.Component {

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
      <React.Fragment>
        <Link to={`/editlisting/${this.props.listing.id}`}><button>Edit</button></Link>
        <button onClick={() => { if (window.confirm('Are you sure you wish to delete this listing?')) this.onCancel(this.props.listing) } }>Delete</button>
      </React.Fragment>
    )
  }

  renderLanguages(){
    const languages = this.props.listing.languages.map(language => language.language)
    return languages.join(" , ")
  }

  renderProvisions(){
    const provisions = this.props.listing.provisions.map(provision => provision.provision)
    if (provisions.length === 0) {
      return "none"
    } else {
      return provisions.join(" , ")
    }
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

  render(){
    return (
      <div className="listing-profile-info">
        <div className="listing-profile-title-pic">
          <h3>{this.props.listing.title}</h3>
          <img src={this.props.listing.pictures[0].image_url}/>
          {this.props.userType === 'host' ? this.renderEditDelete() : null}
        </div>
        <div className="listing-profile-details">
          <p>Address: {this.props.listing.address}</p>
          <p>Room Type: {this.props.listing.room_type}</p>
          <p>Capacity: {this.props.listing.capacity}</p>
          <p>Languages: {this.renderLanguages()}</p>
          <p>Household Type: {this.props.listing.household_type}</p>
          <p>Guest Preference: {this.props.listing.guest_preference}</p>
          <p>Additional Provisions: {this.renderProvisions()}</p>
          <p>Description: {this.props.listing.description}</p>
        </div>
        {this.props.userType === 'caseworker' ? this.renderHostInfo() : null}
      </div>
    )
  }


}

export default connect(generateMSP(["userType", "currentUser", "listings"]), {deleteListing, setConversation})(ListingProfile)
