import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {setConversation, updateReadMessages} from '../actions/actions'
import profile from '../images/profile.svg'

function Conversation (props) {

  function renderLastMessage(){
    // console.log("IN RENDERLASTMESSAGE", this.props.conversation)
    if (props.conversation.messages.length === 0) {
      return (<p>No Messages</p>)
    } else {
      const lastMessage = props.conversation.messages[props.conversation.messages.length-1].body
      return (<p>{lastMessage}</p>)
    }
  }

  function renderRecipientInfo(){

    if (props.conversation.sender.id === props.currentUser.id) {
      return (
        <div className="recipient-info">
        <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={props.conversation.recipient.profile_image ? this.props.conversation.recipient.profile_image : profile}/>
        <h6>{props.conversation.recipient.name}</h6>
        </div>
      )
    } else {
      return (
        <div className="recipient-info">
        <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={props.conversation.sender.profile_image ? props.conversation.sender.profile_image : profile}/>
        <h6>{props.conversation.sender.name}</h6>
        </div>
      )
    }
  }

  function triggerNewConversation(){
    fetch(`http://localhost:3000/readMessage/${props.conversation.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        currentUserId: props.currentUser.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      props.setConversation(response)
      props.updateReadMessages(response)
    })
  }

  function renderUnreadCount(){

    const unreadMessages = props.conversation.messages.filter(message => {
      return message.user_id !== props.currentUser.id && message.read === false
    })
    const unreadMessageCount = unreadMessages.length

    if (unreadMessageCount === 0){
      return null
    } else {
      return <p className='unread-message-count'>{unreadMessageCount}</p>
    }
  }

  return(
    <div className="conversation-item" onClick={triggerNewConversation}>
      {renderRecipientInfo()}
      <div className="conversation-details-container">
      {renderLastMessage()}
      {renderUnreadCount()}
      </div>
    </div>
  )

}

export default connect(generateMSP(["currentUser"]), {setConversation, updateReadMessages})(Conversation)
