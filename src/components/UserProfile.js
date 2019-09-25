import React from 'react'
import { connect } from 'react-redux'
import {setUser} from '../actions/actions'
import default_profile from '../images/default_profile.png'
import {generateMSP} from '../actions/msp_template'
import ReactFilestack from 'filestack-react';


class UserProfile extends React.Component {

  state = {
    editMode: false,
    name: this.props.currentUser.name || "",
    username: this.props.currentUser.username || "",
    description: this.props.currentUser.description || "",
    profile_image: this.props.currentUser.profile_image || ""
  }

  editProfile = () =>{
    this.setState({
      editMode: true
    })
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitEdit = event => {
    event.preventDefault()
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Update-Type': 'edit'
      },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        description: this.state.description,
        profile_image: this.state.profile_image
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.setUser(response)
    })
    .then(this.setState({
      editMode: false
    }))
  }

  render(){
    console.log("CURRENT USER", this.props.currentUser)
    const {name, username, description, user_type, profile_image} = this.state
    if (!this.state.editMode) {
      return(
        <div className="main-profile-container">
          <h3>Your Profile</h3>
            <div className="profile-container">
              <div className="profile-image-and-names">
                {profile_image ? <img src={this.props.currentUser.profile_image}/> : <img src={default_profile}/>}
                <h1>{this.props.currentUser.name}</h1>
                <h2>{this.props.currentUser.username}</h2>
              </div>
              <div className="profile-description">
                <h4>{this.props.currentUser.user_type.toUpperCase()}</h4>
                <p>{this.props.currentUser.description}</p>
                <button onClick={this.editProfile}>Edit Profile</button>
              </div>
            </div>
        </div>
      )
    } else {
      return(
        <div className="main-profile-container">
        <h3>Edit Profile</h3>
          <div className="edit-profile-container">
          <form onSubmit={this.submitEdit}>
            <input type="text" name="name" onChange={this.handleInput} value={this.state.name} placeholder="Name"/>
            <input type="text" name="username" onChange={this.handleInput} value={this.state.username} placeholder="Username"/>
            <textarea type="text" name="description" onChange={this.handleInput} value={this.state.description} placerholder="Description"/>

            <ReactFilestack
            apikey={"ASRKTt2smQC6FJUSI8YrSz"}
            onSuccess={(res) => {
              this.setState({
                profile_image: res.filesUploaded[0].url
              })
            }}
            />
            <input type="submit" value="Save"/>
          </form>
          </div>
        </div>
      )
    }
  }
}


export default connect(generateMSP(["currentUser"]), {setUser})(UserProfile)
