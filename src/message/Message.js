import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import profile from '../images/profile.svg'

const Message = props => {
  function renderName(){
    if (props.message.user_id === props.currentUser.id) {
      return <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={props.currentUser.profile_image ? props.currentUser.profile_image : profile}/>
    } else {
      if (props.currentConversation.sender.id === props.currentUser.id) {
        return <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={props.currentConversation.recipient.profile_image ? props.currentConversation.recipient.profile_image : profile}/>
      } else {
        return <img style={{width: '30px', height: '30px', borderRadius: '30px'}} src={props.currentConversation.sender.profile_image ? props.currentConversation.sender.profile_image : profile}/>

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
