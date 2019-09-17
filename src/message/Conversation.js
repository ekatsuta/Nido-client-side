import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {setConversation, updateReadMessages} from '../actions/actions'
import profile from '../images/profile.svg'

class Conversation extends React.Component {


  renderLastMessage = () =>{
    console.log("IN RENDERLASTMESSAGE", this.props.conversation)
    if (this.props.conversation.messages.length === 0) {
      return (<p>No Messages</p>)
    } else {
      const lastMessage = this.props.conversation.messages[this.props.conversation.messages.length-1].body
      return (<p>{lastMessage}</p>)
    }
  }

  renderRecipientInfo =()=>{

    if (this.props.conversation.sender.id === this.props.currentUser.id) {
      return (
        <div className="recipient-info">
        <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={this.props.conversation.recipient.profile_image ? this.props.conversation.recipient.profile_image : profile}/>
        <h6>{this.props.conversation.recipient.name}</h6>
        </div>
      )
    } else {
      return (
        <div className="recipient-info">
        <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={this.props.conversation.sender.profile_image ? this.props.conversation.sender.profile_image : profile}/>
        <h6>{this.props.conversation.sender.name}</h6>
        </div>
      )
    }
  }

  triggerNewConversation=()=>{
    fetch(`http://localhost:3000/readMessage/${this.props.conversation.id}`, {
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

      this.props.setConversation(response)
      this.props.updateReadMessages(response)
    })
  }

  renderUnreadCount=()=>{

    const unreadMessages = this.props.conversation.messages.filter(message => {
      return message.user_id !== this.props.currentUser.id && message.read === false
    })
    const unreadMessageCount = unreadMessages.length

    if (unreadMessageCount === 0){
      return null
    } else {
      return <p className='unread-message-count'>{unreadMessageCount}</p>
    }
  }

  render(){
    return(
      <div className="conversation-item" onClick={this.triggerNewConversation}>
        {this.renderRecipientInfo()}
        <div className="conversation-details-container">
        {this.renderLastMessage()}
        {this.renderUnreadCount()}
        </div>
      </div>
    )
  }
}

export default connect(generateMSP(["currentUser"]), {setConversation, updateReadMessages})(Conversation)
