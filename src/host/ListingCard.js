import React from 'react'
import {Link} from 'react-router-dom'

const ListingCard = props => {

  function redirect(id){
    props.history.push(`/listings/${id}`)
  }

  function renderProvisions(){
    const provisionNames = props.listing.provisions.map(provision => provision.provision)
    if (provisionNames.length === 0) {
      return "none"
    } else {
      return provisionNames.join(" , ")
    }
  }

  return(
    <div onClick={() => redirect(props.listing.id)} className="listingcard">
      <div className="listingcard-image-title">
        <img src={props.listing.pictures[0].image_url}/>
        <div className="listingcard-details">
          <h4>{props.listing.title}</h4>
          <p>Address: {props.listing.address}</p>
          <p>Guest Preference: {props.listing.guest_preference}</p>
          <p>Household Type: {props.listing.household_type}</p>
          <p>Room Type: {props.listing.room_type}</p>
          <p>Provisions: {renderProvisions()}</p>
        </div>
      </div>
      <div className="listingcard-description">
        <p>{props.listing.description}</p>
      </div>

    </div>
  )
}

export default ListingCard
