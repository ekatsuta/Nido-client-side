import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {updateReadMessages} from '../actions/actions'

class MessageList extends React.Component {

  componentDidMount(){
    // window.scrollTo(0, 1000)
    fetch(`http://localhost:3000/readMessage/${this.props.currentConversation.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        currentUserId: this.props.currentUser.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.updateReadMessages(response)
    })
  }

  renderMessage(){
    if (!this.props.currentConversation){
      if (this.props.conversations.length === 0) {
        return (
          <div>Currently No Messages</div>
        )
      } else {
        const showConversation = this.props.conversations[0]
        return showConversation.messages.map(message => {
          return <Message message={message} key={message.id}/>
        })
      }
    }
    if (this.props.currentConversation.messages.length > 0)
      return this.props.currentConversation.messages.map(message => {
        return <Message message={message} key={message.id}/>
      })
    else
      return (
        <div>Currently No Messages</div>
      )
  }

  renderTitle() {
    if (this.props.currentConversation.sender.id === this.props.currentUser.id) {
      return <p>To: {this.props.currentConversation.recipient.name}</p>
    } else {
      return <p>To: {this.props.currentConversation.sender.name}</p>
    }
  }

  render(){
    return(
      <div className="message-list">
      {this.renderTitle()}
      {this.renderMessage()}
      </div>
    )
  }
}

export default connect(generateMSP(["currentConversation", "conversations", "currentUser"]), {updateReadMessages})(MessageList)
