import React from 'react'
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {editCase} from '../actions/actions'

class EditCase extends React.Component {

  state = {
    num_members: this.props.caseObj.num_members || 0,
    guest_type: this.props.caseObj.guest_type || "",
    household_preference: this.props.caseObj.household_preference || "",
    special_notes: this.props.caseObj.special_notes || "",
    language: this.props.caseObj.languages[0] || "",
    image_url: this.props.caseObj.image_url || ""
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch(`http://localhost:3000/cases/${this.props.caseObj.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        caseObj: this.state
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.editCase(response)
    })
    .then(() => this.props.history.push(`/cases/${this.props.caseObj.id}`))

  }



  render(){
    console.log("FORM CHECK", this.props)
    return(
      <div>
       <form onSubmit={this.handleSubmit}>
         <input type="number" name="num_members" value={this.state.num_members} onChange={this.handleInput} placeholder="Number of Members"/>

         <select name="guest_type" onChange={this.handleInput}>
           <option value="" disabled selected hidden>Select your guest type</option>
           <option value="Single Woman">Single Woman</option>
           <option value="Single Man">Single Man</option>
           <option value="Family">Family</option>
           <option value="Infant">Infant</option>
           <option value="Child">Child</option>
           <option value="Elderly">Elderly</option>
           <option value="Couple">Couple</option>
         </select>

         <select name="household_preference" onChange={this.handleInput}>
           <option value="" disabled selected hidden>Select your household preference</option>
           <option value="Single Woman">Single Woman</option>
           <option value="Single Man">Single Man</option>
           <option value="Couple">Couple</option>
           <option value="Family with Children">Family with Children</option>
           <option value="Gay/Lesbian">Gay/Lesbian</option>
           <option value="Siblings">Siblings</option>
           <option value="Other">Other</option>
         </select>

         <select name="language" onChange={this.handleInput}>
           <option value="" disabled selected hidden>Select your language preference</option>
           {this.props.languages.map(language => {
             return <option value={language}>{language}</option>
           })}
         </select>

         <textarea name="special_notes" value={this.state.special_notes} onChange={this.handleInput} placeholder="Special Notes"/>

         <ReactFilestack
         apikey={"ASRKTt2smQC6FJUSI8YrSz"}
         onSuccess={(res) => {
           this.setState({
             image_url: res.filesUploaded[0].url
           })
         }}
         />

         <input type="submit" value="SUBMIT"/>
       </form>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "languages"]), {editCase})(EditCase)
