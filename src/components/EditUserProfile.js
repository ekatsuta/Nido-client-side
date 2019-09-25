import React from 'react'
import {connect} from 'react-redux'
import { setUser } from '../actions/actions'
import {generateMSP} from '../actions/msp_template'
import ReactFilestack from 'filestack-react';

class EditUserProfile extends React.Component {

  state = {
    name: "",
    description: "",
    profile_img: ""
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Update-Type': 'initial'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        profile_image: this.state.profile_img
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.setUser(response)
    })
    .then( () => {
      if (this.props.userType === 'host') {
        this.props.history.push('/newlisting')
      } else {
        this.props.history.push('/newcase')
      }
    })
  }

  render(){
      return(
        <div className="main-profile-container">
          <h3 style={{justifyContent: "center"}}>Thank you for signing up! Please let us know a little more about you.</h3>
          <div className="edit-profile-container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Your Name"/>
            <textarea name="description" value={this.state.description} onChange={this.handleInput} placeholder="Brief Description about Yourself"/>

            <ReactFilestack
            apikey={"ASRKTt2smQC6FJUSI8YrSz"}
            onSuccess={(res) => {
              this.setState({
                profile_img: res.filesUploaded[0].url
              })
            }}
            />

            <input type="submit" value="SAVE"/>
          </form>
          </div>
        </div>
      )
  }

}


export default connect(generateMSP(["userType", "currentUser"]), {setUser})(EditUserProfile)
