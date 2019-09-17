import React from 'react'
import ListingCard from './ListingCard'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {Link} from 'react-router-dom'

class ListingCardContainer extends React.Component{

  state = {
    sortLanguage: null,
    sortHousehold: null,
    sortCapacity: 0,
    sortProvision: null,
    sortGuestPreference: null,
    sortChildren: null,
    currentListings: this.props.allListings,
    sortProps: false
  }

  mapListing = (listingArr) => {
    return listingArr.map(listing => {
      return (
        <ListingCard history={this.props.history} key={listing.id} listing={listing}/>
      )
    })
  }

  renderListingCard(){
    if (this.props.userType === 'host') {
      return this.mapListing(this.props.listings)
    } else if (this.props.userType === 'caseworker') {
      if (this.state.sortLanguage) {
        const sortedListings = this.state.currentListings.filter(listing => {
          const listingLanguages= listing.languages.map(language => {
            return language.language
          })
          return listingLanguages.includes(this.state.sortLanguage)
        })
        return this.mapListing(sortedListings)
      } else if (this.state.sortHousehold) {
        const sortedListings = this.state.currentListings.filter(listing => {
          return listing.household_type === this.state.sortHousehold
        })
        return this.mapListing(sortedListings)
      } else if (this.state.sortCapacity) {
        const sortedListings = this.state.currentListings.filter(listing => {
          return listing.capacity >= this.state.sortCapacity
        })
        return this.mapListing(sortedListings)
      } else if (this.state.sortProvision) {
        const sortedListings = this.state.currentListings.filter(listing => {
          const listingProvisions= listing.provisions.map(provision => {
            return provision.provision
          })
          return listingProvisions.includes(this.state.sortProvision)
        })
        return this.mapListing(sortedListings)
      } else if (this.state.sortGuestPreference) {
        const sortedListings = this.state.currentListings.filter(listing => {
          return listing.guest_preference === this.state.sortGuestPreference
        })
        return this.mapListing(sortedListings)
      } else {
        return this.mapListing(this.props.allListings)
      }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderHouseholdOptions(){
    const householdOptions = this.props.allListings.map(listing => {
      return listing.household_type
    })
    const uniqueHouseholdOptions = [...new Set(householdOptions)]
    return uniqueHouseholdOptions.map(option => {
      return <option value={option}>{option}</option>
    })
  }

  renderGuestPreferences(){
    const guestPreferences = this.props.allListings.map(listing => {
      return listing.guest_preference
    })
    const uniquePreferenceOptions = [...new Set(guestPreferences)]
    return uniquePreferenceOptions.map(option => {
      return <option value={option}>{option}</option>
    })
  }

  clearSearch = () =>{
    this.setState({
      sortLanguage: null,
      sortHousehold: null,
      sortCapacity: 0,
      sortProvision: null,
      sortGuestPreference: null,
      sortChildren: null
    })
  }

  renderSortOptions(){
    return (
      <div className='sort-options-container'>
        <select name="sortLanguage" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Language</option>
          {this.props.languages.map(language => {
            return <option value={language}>{language}</option>
          })}
        </select>

        <select name="sortHousehold" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Household Type</option>
        {this.renderHouseholdOptions()}
        </select>


        <input type="number" name="sortCapacity" onChange={this.handleChange} value={this.state.sortCapacity} placeholder="Minimum Capacity"/>

        <select name="sortProvision" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Additional Provisions</option>
          {this.props.provisions.map(provision => {
            return <option value={provision}>{provision}</option>
          })}
        </select>

        <select name="sortGuestPreference" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Guest Preferences</option>
          {this.renderGuestPreferences()}
        </select>

        <button onClick={this.clearSearch}>Clear Search</button>
      </div>
    )
  }

  render(){
    console.log("CHECK ON RENDER OF LISTING", this.state)
    return(
      <div className="card-container">
        <div className="card-container-buttons">
          {this.props.userType === 'host' ? <Link to="/listingquestions"><button className="add-button">ADD LISTING</button></Link> : null}
          <div className='sort-dropdown-button'>{this.props.userType === 'caseworker' ? <button  onClick={()=>this.setState({sortProps: !this.state.sortProps})}>SHOW FILTER OPTIONS</button> : null}</div>
        </div>
          {this.props.userType === 'caseworker' && this.state.sortProps ? this.renderSortOptions() : null}
        {this.renderListingCard()}
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "allListings", "languages", "provisions"]))(ListingCardContainer)
