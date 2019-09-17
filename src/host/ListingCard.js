import React from 'react'
import {Link} from 'react-router-dom'
import admin from '../images/provisions/admin.png'
import legal from '../images/provisions/legal.png'
import food from '../images/provisions/food.png'
import language from '../images/provisions/language.png'
import transportation from '../images/provisions/transportation.png'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class ListingCard extends React.Component {

  state = {
    foodHovered: false,
    languageHovered: false,
    adminHovered: false,
    legalHovered: false,
    transHovered: false
  }

  redirect = (id) => {
    this.props.history.push(`/listings/${id}`)
  }

  renderProvisions = () => {
    return this.props.listing.provisions.map(provision => {
      if (provision.provision === 'Food') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({foodHovered: true})}
            onMouseLeave={() => this.setState({foodHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}}
            src={food}/>
            {this.state.foodHovered ? <p style={{position: 'absolute', color: 'blue'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Legal Aid') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({legalHovered: true})}
            onMouseLeave={() => this.setState({legalHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={legal}/>
            {this.state.legalHovered ? <p style={{position: 'absolute', color: 'blue'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Transportation') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({transHovered: true})}
            onMouseLeave={() => this.setState({transHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={transportation}/>
            {this.state.transHovered ? <p style={{position: 'absolute', color: 'blue'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Administrative Aid') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({adminHovered: true})}
            onMouseLeave={() => this.setState({adminHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={admin}/>
            {this.state.adminHovered ? <p style={{position: 'absolute', color: 'blue'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      } else if (provision.provision === 'Language Practice') {
        return (
          <React.Fragment>
            <img onMouseEnter={() => this.setState({languageHovered: true})}
            onMouseLeave={() => this.setState({languageHovered: false})}
            style={{width: '30px', margin: '0px 3px 0px 3px'}} src={language}/>
            {this.state.languageHovered ? <p style={{position: 'absolute', color: 'blue'}}>{provision.provision}</p> : null}
          </React.Fragment>
        )
      }
    })
  }

  renderPlacementPeriod(){
    const start = new Date(this.props.placement.period.split(",")[0])
    const end = new Date(this.props.placement.period.split(",")[1])
    const convertedStart = start.getMonth()+1 + "/" + start.getDate() + "/" + start.getFullYear()
    const convertedEnd = end.getMonth()+1 + "/" + end.getDate() + "/" + end.getFullYear()

    return (<p className="casecard-placement-period">From {convertedStart} to {convertedEnd}</p>)
  }

  render(){
    return(
      <div onClick={() => this.redirect(this.props.listing.id)} className="listingcard">
          <div className="listingcard-title-address">
          <h4>{this.props.listing.title}</h4>
          <h5>{this.props.listing.address}</h5>
          </div>
        <div className="listingcard-image-title">
          <img src={this.props.listing.pictures[0].image_url}/>
        <div className="listingcard-details">
        <p>Max Capacity: {this.props.listing.capacity}</p>
        <p>Guest Preference: {this.props.listing.guest_preference}</p>
        <p>Household Type: {this.props.listing.household_type}</p>
        <p>Room Type: {this.props.listing.room_type}</p>
        <p>{this.renderProvisions()}</p>
        </div>
        </div>
        <div className="listingcard-description">
        <p>{this.props.listing.description}</p>
        </div>
        <div className="listingcard-children">
          <h6>OK to host children?</h6>
          {this.props.listing.children ? <p style={{color: 'green', fontWeight: 'bold'}}>YES</p> : <p style={{color: 'red', fontWeight: 'bold'}}>NO</p>}
        </div>
        {this.props.placement ? <p>{this.renderPlacementPeriod()}</p> : null}
      </div>
    )
  }
}

export default connect(generateMSP(["userType"]))(ListingCard)
