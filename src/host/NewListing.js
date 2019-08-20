import React from 'react'
import { Link } from 'react-router-dom'
class NewListing extends React.Component {

  render(){
    return(
      <div className="newlisting-container">
        <h1>Add New Listing?</h1>
        <div className='question-yes-skip'>
          <Link to="/listingquestions"><button>Yes</button></Link>
          <Link to="/home"><button>Skip</button></Link>
        </div>
      </div>
    )
  }
}

export default NewListing
