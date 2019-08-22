import React from 'react'
import Conversation from './Conversation'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


const ConversationContainer = props => {

  function renderConversations(){
    
    if (props.conversations.length === 0) {
      return <div>No Conversations</div>
    }
    return props.conversations.map(conversation => {
      return <Conversation conversation={conversation}/>
    })
  }

  return(
    <div className="conversation-container">
      {renderConversations()}
    </div>
  )
}

export default connect(generateMSP(["conversations"]))(ConversationContainer)
