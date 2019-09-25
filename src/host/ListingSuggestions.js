import React from 'react'
import ListingCard from './ListingCard'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


function ListingSuggestions (props) {

  function renderPendingRequest(){
    const foundPlacements = props.caseObj.placements.filter(placement => {
      return placement.status === 'pending'
    })
    const placementListingIds = foundPlacements.map(placement => {
      return placement.listing_id
    })
    const pendingListings = props.allListings.filter(listing => {
      return placementListingIds.includes(listing.id)
    })

    if(pendingListings.length ===0){
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    }

    return pendingListings.map(listing => {
      return <ListingCard history={props.history} listing={listing}/>
    })
  }

  function renderApprovedRequest(){
    const foundPlacements = props.caseObj.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[0]) > Date.parse(props.currentDate)
    })
    const placementListingIds = foundPlacements.map(placement => {
      return placement.listing_id
    })
    const approvedListings = props.allListings.filter(listing => {
      return placementListingIds.includes(listing.id)
    })

    if(approvedListings.length ===0){
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    }

    return approvedListings.map(listing => {
      const booking = foundPlacements.find(placement => placement.listing_id === listing.id)
      return <ListingCard history={props.history} listing={listing} placement={booking}/>
    })
  }

  function renderPastListings(){
    const foundPlacements = props.caseObj.placements.filter(placement => {
      return placement.status === 'approved' && Date.parse(placement.period.split(",")[1]) < Date.parse(props.currentDate)
    })
    const placementListingIds = foundPlacements.map(placement => {
      return placement.listing_id
    })
    const pastListings = props.allListings.filter(listing => {
      return placementListingIds.includes(listing.id)
    })

    if(pastListings.length ===0){
      return <p style={{fontStyle: 'italic', color: '#e7344a'}}>None</p>
    }

    return pastListings.map(listing => {
      return <ListingCard history={props.history} listing={listing}/>
    })
  }

  function renderSuggestions(){
    //first filter listings that can hold the number of guests
    const filteredListings = props.allListings.filter(listing => {
      return listing.capacity >= props.caseObj.num_members
    })
    if (filteredListings.length > 3) {
      //filter down to household preference or guest preference
      const subfilteredList = filteredListings.filter(listing => {
        return listing.household_type === props.caseObj.household_preference || listing.guest_preference === props.caseObj.guest_type
      })
      const languageMatch = filteredListings.filter(listing => {
        const listingLanguages = listing.languages.map(language => language.language)
        const caseLanguages = props.caseObj.languages.map(language => language.language)

        for (let i = 0; i < listingLanguages.length; i++){
          for (let j = 0; j < caseLanguages.length; j++) {
            if (listingLanguages[i] === caseLanguages[j]){
              return listing
            }
          }
        }
      })
      const finalList = subfilteredList.concat(languageMatch)
      return finalList.map(listing => {
        return <ListingCard listing={listing} history={props.history}/>
      })
    } else {
      return filteredListings.map(listing => {
        return <ListingCard listing={listing} history={props.history}/>
      })
    }

  }


  return(
    <div className="case-listings-container">
      <div className='listing-suggestions-container'>
        <h3>Listing Suggestions:</h3>
        {renderSuggestions()}
      </div>
      <div className="pending-approved-past-container">
        <div className='pending-lists'>
          <h4>PENDING REQUESTS:</h4>
          {renderPendingRequest()}
        </div>
        <div className='approved-lists'>
          <h4>APPROVED REQUESTS:</h4>
          {renderApprovedRequest()}
        </div>
        <div className='past-lists'>
          <h4>PAST LISTINGS:</h4>
          {renderPastListings()}
        </div>
      </div>
    </div>
  )

}

export default connect(generateMSP(["allListings", "currentDate"]))(ListingSuggestions)
