import React from 'react'
import ListingProfile from './ListingProfile'
import ListingInfo from './ListingInfo'
import BookingInfo from './BookingInfo'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


class ListingPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return (
      <div>
        <ListingProfile history={this.props.history} listing={this.props.listing}/>
        {this.props.userType === 'host' ? <ListingInfo listing={this.props.listing}/> : null}
        {this.props.userType === 'caseworker' ? <BookingInfo listing={this.props.listing}/> : null}
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "allListings"]))(ListingPage)
