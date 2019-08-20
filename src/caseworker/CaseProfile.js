import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {deleteCase, setConversation} from '../actions/actions'
import ListingCard from '../host/ListingCard'
import {Link} from 'react-router-dom'

class CaseProfile extends React.Component {

  onCancel(caseObj){
    fetch(`http://localhost:3000/cases/${this.props.caseObj.id}`,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(response => {
      debugger
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
      <div>
      <Link to={`/editcase/${this.props.caseObj.id}`}><button>Edit</button></Link>
      <button onClick={() => { if (window.confirm('Are you sure you wish to delete this case?')) this.onCancel(this.props.caseObj) } }>Delete</button>
      </div>
    )
  }


  render(){
    return (
      <div className="case-profile-info">
        <div className="case-profile-title-pic">
          <img src={this.props.caseObj.image_url} />
          {this.props.userType === 'host' ? null : this.renderEditandDelete()}

        </div>
        <div className="case-profile-details">
          <p>Household Preference: {this.props.caseObj.household_preference}</p>
          <p>Number of Members: {this.props.caseObj.num_members}</p>
          <p>Guest Type: {this.props.caseObj.guest_type}</p>
          <p>Creation Date: {this.props.caseObj.created_at}</p>
          {this.props.currentUser.user_type === 'host' ? <button onClick={this.createConversation}>MESSAGE CASEWORKER</button> : null}
        </div>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "listings", "allListings", "currentDate"]), {deleteCase, setConversation})(CaseProfile)
