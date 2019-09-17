import React from 'react'
import UserPage from './UserPage'
import Profile from './Profile'
import CasesContainer from '../caseworker/CasesContainer'
import ListingsContainer from '../host/ListingsContainer'
import RequestsContainer from '../host/RequestsContainer'
import Login from '../components/Login'
import Signup from '../components/Signup'
import NewCase from '../caseworker/NewCase'
import NewListing from '../host/NewListing'
import CasePage from '../caseworker/CasePage'
import ListingPage from '../host/ListingPage'
import EditUserProfile from '../components/EditUserProfile'
import NewListingQuestions from '../host/NewListingQuestions'
import NewCaseQuestions from '../caseworker/NewCaseQuestions'
import EditListing from '../host/EditListing'
import EditCase from '../caseworker/EditCase'
import MessageContainer from '../message/MessageContainer'


import {generateMSP} from '../actions/msp_template'
import {loadListings, loadCases} from '../actions/actions'

import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

class MainContainer extends React.Component {


  componentDidMount(){
    this.props.loadListings()
    this.props.loadCases()
  }

  render (){

    if (this.props.loading) {
      return (
        <div className="loader">
          <h3>LOADING...</h3>
          <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>
      )
    } else {
      return (
        <div className="main-container">
        <Switch>
        <Route exact path="/" render={(routerProps) => <Login {...routerProps}/>}/>
        <Route exact path="/home" render={(routerProps) => <UserPage {...routerProps}/>}/>
        <Route exact path="/profile" render={(routerProps) => <Profile {...routerProps}/>}/>
        <Route exact path="/cases" render={(routerProps) => <CasesContainer {...routerProps}/>}/>
        <Route exact path="/listings" render={(routerProps) => <ListingsContainer {...routerProps}/>}/>
        <Route exact path="/requests" render={(routerProps) => <RequestsContainer {...routerProps}/>}/>
        <Route exact path="/signup" render={(routerProps) => <Signup {...routerProps}/>}/>
        <Route exact path="/newcase" render={(routerProps) => <NewCase {...routerProps}/>}/>
        <Route exact path="/newlisting" render={(routerProps) => <NewListing {...routerProps}/>}/>
        <Route exact path="/requests" render={(routerProps) => <RequestsContainer {...routerProps}/>}/>
        <Route exact path="/edit" render={(routerProps) => <EditUserProfile {...routerProps}/>}/>
        <Route exact path="/listingquestions" render={(routerProps) => <NewListingQuestions {...routerProps}/>}/>
        <Route exact path="/casequestions" render={(routerProps) => <NewCaseQuestions {...routerProps}/>}/>
        <Route exact path="/message" render={(routerProps) => <MessageContainer {...routerProps}/>}/>

        <Route exact path="/listings/:id" render={(routerProps) => {

          const foundListing = this.props.allListings.find(listing => listing.id ===parseInt(routerProps.match.params.id))

          return (<ListingPage listing={foundListing} {...routerProps}/>) }
        }/>

        <Route exact path="/cases/:id" render={(routerProps) => {
          const foundCase = this.props.allCases.find(caseObj => caseObj.id ===parseInt(routerProps.match.params.id))

          return (<CasePage caseObj={foundCase} {...routerProps}/>) }
        }/>

        <Route exact path="/editlisting/:id" render={(routerProps) => {
          const foundListing = this.props.listings.find(listing => listing.id ===parseInt(routerProps.match.params.id))

          return (<EditListing listing={foundListing} {...routerProps}/>) }
        }/>

        <Route exact path="/editcase/:id" render={(routerProps) => {
          const foundCase = this.props.cases.find(caseObj => caseObj.id ===parseInt(routerProps.match.params.id))

          return (<EditCase caseObj={foundCase} {...routerProps}/>) }
        }/>


        </Switch>
        </div>
      )

    }
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "cases", "allListings", "allCases", "currentCase", "loading"]), {loadListings, loadCases})(MainContainer)
