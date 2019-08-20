import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

import CaseCard from '../caseworker/CaseCard'

class RequestCardContainer extends React.Component {

  state = {
    status: null,
    listingId: null,
    placements: this.props.placements
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clearSearch = () =>{
    this.setState({
      status: null,
      listingId: null,
      placements: this.props.placements
    })
  }

  mapPlacements(placementsArr){
    if (placementsArr.length === 0) {
      return <h4>No requests</h4>
    }
    return placementsArr.map(placement => {
      const caseObj = this.props.allCases.find(caseInstance => {
        return caseInstance.id === placement.case_id
      })

      return <CaseCard caseObj={caseObj} placement={placement} history={this.props.history}/>
    })
  }

  renderPlacements(){
    if (this.state.status) {
      const filteredPlacements = this.props.placements.filter(placement => {
        return placement.status === this.state.status
      })

      return this.mapPlacements(filteredPlacements)
    }
    if (this.state.listingId){
      const filteredPlacements = this.state.placements.filter(placement => {
        return placement.listing_id === parseInt(this.state.listingId)
      })
      return this.mapPlacements(filteredPlacements)
    }
    return this.mapPlacements(this.state.placements)
  }

  renderListingOptions(){

    const options = this.props.currentUser.listings.map(listing => {
      return listing.id
    })
    const uniqueOptions = [...new Set(options)]

    return uniqueOptions.reverse().map(option => {
      return <option value={option}>Listing Id # {option}</option>
    })
  }

  renderFilterOptions(){
    return (
      <div className='filter-options-container'>
        <select name="status" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Status</option>
          <option value="approved">APPROVED</option>
          <option value="pending">PENDING</option>
          <option value="cancelled">CANCELLED</option>
        </select>

        <select name="listingId" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Listing</option>
          {this.renderListingOptions()}
        </select>

        <button onClick={this.clearSearch}>Clear Search</button>
      </div>
    )
  }

  render(){
    console.log("REQUESTS", this.state)
    return (
      <div className="card-container">
      {this.renderFilterOptions()}
      {this.renderPlacements()}
      </div>
    )
  }
}

export default connect(generateMSP(["placements", "allCases", "currentUser"]))(RequestCardContainer)
