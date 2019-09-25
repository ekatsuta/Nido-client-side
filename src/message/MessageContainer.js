import React from 'react'
import ConversationContainer from './ConversationContainer'
import MessageList from './MessageList'
import NewMessage from './NewMessage'

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

export default MessageContainer
