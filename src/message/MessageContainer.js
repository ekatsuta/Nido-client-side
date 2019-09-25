import React from 'react'
import ConversationContainer from './ConversationContainer'
import MessageList from './MessageList'
import NewMessage from './NewMessage'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class MessageContainer extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return (
      <div className='messagepage-container'>
          <ConversationContainer />
        <div className="messagelist-newmessage">
          <MessageList />
          <NewMessage />
        </div>
      </div>
    )
  }
}

export default connect(generateMSP(["currentConversation"]))(MessageContainer)
