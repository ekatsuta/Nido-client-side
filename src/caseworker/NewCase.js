import React from 'react'
import {Link} from 'react-router-dom'

class NewCase extends React.Component {


  render(){
    return(
      <div className="newcase-container">
      <h1>Add New Case?</h1>
        <div className="question-yes-skip">
        <Link to="/casequestions">Yes</Link>
        <Link to="/home">Skip</Link>
        </div>
      </div>
    )
  }
}

export default NewCase
