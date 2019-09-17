import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {approveOrCancelPlacement, setCase, checkPlacement} from '../actions/actions'
import case_image from '../images/default_case_img.jpg'

class CaseCard extends React.Component {

  redirect(id){
    this.props.history.push(`/cases/${id}`)
  }

  validateRequest = () => {
    fetch(`http://localhost:3000/placements/${this.props.placement.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        status: "approved"
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.approveOrCancelPlacement(response)
        this.props.checkPlacement(response)
        alert("Validated Request!")
      }
    })
  }

  cancelRequest = () => {
    fetch(`http://localhost:3000/placements/${this.props.placement.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        status: "cancelled"
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.approveOrCancelPlacement(response)
        this.props.checkPlacement(response)
        alert("Cancelled Request")
      }
    })
  }

  calculateDiffDays = (dateObj) => {
    const d1 = new Date(dateObj)
    const d2 = new Date(this.props.currentDate)
    const timeDiff = d2.getTime() - d1.getTime()
    return Math.floor(timeDiff / (1000 * 3600 * 24)) * -1
  }

  renderStatus = () => {
    //first check if there are any future placement objects

    const futurePlacements = this.props.caseObj.placements.filter(placement => {
      // const a = new Date(placement.period.split(",")[0])
      // const b = new Date(this.props.currentDate)
      // const aDate = a.getMonth()+1 + "/" + a.getDate() + "/" + a.getFullYear()
      // const bDate = b.getMonth()+1 + "/" + b.getDate() + "/" + b.getFullYear()
      return Date.parse(placement.period.split(",")[0]) > Date.parse(this.props.currentDate)
    })

    //if none in future, status should be "AWAITING PLACEMENT"
    if (futurePlacements.length === 0) {
      return <p style={{color: 'red'}}>Status: AWAITING PLACEMENT</p>
    //if in future, check if any have status of "approved"
    } else {
      const approvedPlacements = futurePlacements.filter(placement => {
        return placement.status === 'approved'
      })
      //if NO, show Status as "REQUEST PENDING"
      if (approvedPlacements.length === 0){
        return <p style={{color: 'blue'}}>Status: REQUEST PENDING</p>
      //if YES, select the next occuring placement, show Status as "MATCHED", and include #days until next match start date & end date
      } else {
        const sortedPlacements = approvedPlacements.sort((a,b) => Date.parse(a.period.split(",")[0]) < Date.parse(b.period.split(",")[0]) ? -1 : 1)
        const nextPlacement = sortedPlacements[0]
        return (
          <React.Fragment>
          <h5 style={{color: 'green'}}>Status: MATCHED</h5>
          <p>Days until next placement: {this.calculateDiffDays(nextPlacement.period.split(",")[0])} days</p>
          <p>Days until end of next placement: {this.calculateDiffDays(nextPlacement.period.split(",")[1])} days</p>

          </React.Fragment>
        )
      }
    }
  }

  renderDate = (dateObj) => {
    const date = new Date(dateObj)
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()
  }

  setUserAndRedirect = () => {
    this.props.setCase(this.props.caseObj)
    this.redirect(this.props.caseObj.id)
  }

  updatePlacementAndRedirect = () => {
    fetch(`http://localhost:3000/checked/${this.props.placement.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        checked: true
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.checkPlacement(response)
        this.redirect(this.props.caseObj.id)
      }
    })
  }

  renderPlacementPeriod(){
    const start = new Date(this.props.placement.period.split(",")[0])
    const end = new Date(this.props.placement.period.split(",")[1])
    const convertedStart = start.getMonth()+1 + "/" + start.getDate() + "/" + start.getFullYear()
    const convertedEnd = end.getMonth()+1 + "/" + end.getDate() + "/" + end.getFullYear()

    return (<p className="casecard-placement-period">From {convertedStart} to {convertedEnd}</p>)
  }

  render(){
    return(
      <div className="listingcard">
        <div onClick={this.props.userType === 'host' ? ()=>this.updatePlacementAndRedirect() : ()=> this.setUserAndRedirect()}>
          <div className='listingcard-title-address'>
            <h4>CASE ID # {this.props.caseObj.id}</h4>
            <h5>Guest Type: {this.props.caseObj.guest_type}</h5>
          </div>
          <div className="listingcard-image-title">
              {this.props.caseObj.image_url ? <img src={this.props.caseObj.image_url} alt="case profile"/> : <img src={case_image}/>}
            <div className="casecard-details">
              <p>Number of Members: {this.props.caseObj.num_members}</p>
              <p>Guest Type: {this.props.caseObj.guest_type}</p>
              <p>Creation Date: {this.renderDate(this.props.caseObj.created_at)}</p>
              {this.props.userType === 'host' ? <p style={{fontWeight: 'bold'}}>{this.props.placement.status.toUpperCase()}</p> : null}
            </div>
          </div>
        </div>
          <div className="validate-cancel-buttons">
            {this.props.userType === 'host' && this.props.placement.status === 'pending'? <button onClick={this.validateRequest}>VALIDATE REQUEST</button> : null}
            {this.props.userType === 'host' && this.props.placement.status === 'pending'? <button onClick={this.cancelRequest}>CANCEL REQUEST</button> : null}
          </div>
        <div className='casecard-status-container'>
          {this.props.userType === 'host' ? this.renderPlacementPeriod() : null}
          {this.props.userType === 'caseworker' ? this.renderStatus(): null}
        </div>
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentDate", "currentDate", "allCases"]), {approveOrCancelPlacement, setCase, checkPlacement})(CaseCard)
