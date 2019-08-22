import React from 'react'
import {Link} from 'react-router-dom'

class NewCase extends React.Component {


  render(){
    return(
      <div className="newcase-container">
      <h1>Add New Case?</h1>
        <div className="question-yes-skip">
          <Link to="/casequestions"><button>Yes</button></Link>
          <Link to="/home"><button>Skip</button></Link>
        </div>
        <img src="https://media1.giphy.com/media/3o8dpcngQ7e70RJMiY/giphy.gif?cid=790b7611eafc05140eb2c5a9f6d8f1284851a7db4ff341c6&rid=giphy.gif"/>
      </div>
    )
  }
}

export default NewCase
