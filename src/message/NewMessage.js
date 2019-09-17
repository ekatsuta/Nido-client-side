import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {newMessage} from '../actions/actions'

class NewMessage extends React.Component {

  state = {
    body: ""
  }

  handleInput = event => {
    this.setState({
      body: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        body: this.state.body,
        user_id: this.props.currentUser.id,
        conversation_id: this.props.currentConversation.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.newMessage(response)
      }
    })
    .then(() => this.setState({body: ""}))
  }

  render(){
    return(
      <div className='newmessage-container'>
        <form onSubmit={this.handleSubmit} className='newmessage-form'>
          <textarea name="body" onChange={this.handleInput} placeholder="Type something..." value={this.state.body}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default connect(generateMSP(["currentUser", "currentConversation"]), {newMessage})(NewMessage)
