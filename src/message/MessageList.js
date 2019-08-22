import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {updateReadMessages} from '../actions/actions'

class MessageList extends React.Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  }

  componentDidMount(){
    this.scrollToBottom();
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessage(){
    if (this.props.currentConversation.length === 0){
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
    } else if (this.props.currentConversation.messages.length > 0) {
      return this.props.currentConversation.messages.map(message => {
        return <Message message={message} key={message.id}/>
      })

    } else {
      return (
        <div>Currently No Messages</div>
      )
    }
  }

  renderTitle() {
    if (!this.props.currentMessage) {
      if (this.props.conversations.length === 0) {
        return null
      } else {
        const showConversation = this.props.conversations[0]
        if (showConversation.sender.id === this.props.currentUser.id) {
          return <div className="message-title"><p>To: {this.props.currentConversation.recipient.name}</p></div>
        } else {
          return <div className="message-title"><p>To: {this.props.currentConversation.sender.name}</p></div>
        }
      }
    }
    if (this.props.currentConversation.sender.id === this.props.currentUser.id) {
      return <div className="message-title"><p>To: {this.props.currentConversation.recipient.name}</p></div>
    } else {
      return <div className="message-title"><p>To: {this.props.currentConversation.sender.name}</p></div>
    }
  }

  render(){
    return(
      <div className="message-list">
      {this.renderTitle()}
      <div className="message-container">
      {this.renderMessage()}
        <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(generateMSP(["currentConversation", "conversations", "currentUser"]), {updateReadMessages})(MessageList)
