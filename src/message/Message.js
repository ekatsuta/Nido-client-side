import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

const Message = props => {
  function renderName(){
    if (props.message.user_id === props.currentUser.id) {
      return <p>You</p>
    } else {
      if (props.currentConversation.sender.id === props.currentUser.id) {
        return <p>{props.currentConversation.recipient.name}</p>
      } else {
        return <p>{props.currentConversation.sender.name}</p>

      }
    }
  }

  return(
    <div className="message-item">
    {props.message.user_id === props.currentUser.id ? null : renderName()}
    <div className={props.message.user_id === props.currentUser.id ? "my-message" : "receiving-message"}>{props.message.body}</div>
    {props.message.user_id === props.currentUser.id  ? renderName() : null}
    </div>
  )
}

export default connect(generateMSP(["currentUser", "currentConversation"]))(Message)
