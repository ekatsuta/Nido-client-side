import React from 'react'
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux'
import {editListing} from '../actions/actions'

class EditListing extends React.Component {
  state = {
    title: this.props.listing.title || "",
    description: this.props.listing.description || "",
    guest_preference: this.props.listing.guest_preference || "",
    children: this.props.listing.length_stay || "",
    img_url: this.props.listing.pictures[0] || "",
    selected: this.props.listing.guest_preference || ""
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioInput = event => {
    this.setState({
      guest_preference: event.target.value,
      selected: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch(`http://localhost:3000/listings/${this.props.listing.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        listing: this.state
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.editListing(response)
    })
    .then(this.props.history.push(`/listings/${this.props.listing.id}`))
  }

  render(){

    return(
      <div className='edit-listing-container'>
      <h3>EDIT LISTING</h3>
        <form className="listing-form" onSubmit={this.handleSubmit}>
          <div className="edit-question">
            <p>Title</p>
            <input type="text" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title"/>
          </div>

          <div className="edit-question">
          <p>Description</p>
          <textarea name="description" value={this.state.description} onChange={this.handleInput} placeholder="Description"/>
          </div>

          <div className="edit-question">
          <p>Guest Preference</p>
            <div className="radio-options-edit">
              <div className='radio-option-edit'>
              <input name="guest_preference" type="radio" onChange={this.handleRadioInput} checked={this.state.selected==="Single Woman"} value="Single Woman"/>
              <p>Single Woman</p>
              </div>
              <div className='radio-option-edit'>
              <input name="guest_preference" type="radio" onChange={this.handleRadioInput} checked={this.state.selected==="Single Man"} value="Single Man"/>
              <p>Single Man</p>
              </div>
              <div className='radio-option-edit'>
              <input name="guest_preference" type="radio" onChange={this.handleRadioInput} checked={this.state.selected==="Family"} value="Family"/>
              <p>Family</p>
              </div>
              <div className='radio-option-edit'>
              <input name="guest_preference" type="radio" onChange={this.handleRadioInput} checked={this.state.selected==="Elderly"} value="Elderly"/>
              <p>Elderly</p>
              </div>
              <div className='radio-option-edit'>
              <input name="guest_preference" type="radio" onChange={this.handleRadioInput} checked={this.state.selected==="Couple"} value="Couple"/>
              <p>Couple</p>
              </div>
            </div>

          </div>

          <div className='edit-question'>
          <div className="upload-pic">
            <p>Picture</p>
            <ReactFilestack
            apikey={"ASRKTt2smQC6FJUSI8YrSz"}
            onSuccess={(res) => {
              this.setState({
                img_url: res.filesUploaded[0].url
              })
            }}
            />
          </div>
          </div>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default connect(null, {editListing})(EditListing)
