import React from 'react'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {approveOrCancelPlacement, setCase, checkPlacement} from '../actions/actions'
import case_image from '../images/default_case_img.jpg'

function CaseCard (props) {

  function redirect(id){
    props.history.push(`/cases/${id}`)
  }

  function validateRequest () {
    fetch(`http://localhost:3000/placements/${props.placement.id}`, {
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
        props.approveOrCancelPlacement(response)
        props.checkPlacement(response)
        alert("Validated Request!")
      }
    })
  }

  function cancelRequest () {
    fetch(`http://localhost:3000/placements/${props.placement.id}`, {
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
        props.approveOrCancelPlacement(response)
        props.checkPlacement(response)
        alert("Cancelled Request")
      }
    })
  }

  function calculateDiffDays(dateObj) {
    const d1 = new Date(dateObj)
    const d2 = new Date(props.currentDate)
    const timeDiff = d2.getTime() - d1.getTime()
    return Math.floor(timeDiff / (1000 * 3600 * 24)) * -1
  }

  function renderStatus () {
    //first check if there are any future placement objects

    const futurePlacements = props.caseObj.placements.filter(placement => {
      // const a = new Date(placement.period.split(",")[0])
      // const b = new Date(this.props.currentDate)
      // const aDate = a.getMonth()+1 + "/" + a.getDate() + "/" + a.getFullYear()
      // const bDate = b.getMonth()+1 + "/" + b.getDate() + "/" + b.getFullYear()
      return Date.parse(placement.period.split(",")[0]) > Date.parse(props.currentDate)
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
            <p>Days until next placement: {calculateDiffDays(nextPlacement.period.split(",")[0])} days</p>
            <p>Days until end of next placement: {calculateDiffDays(nextPlacement.period.split(",")[1])} days</p>
          </React.Fragment>
        )
      }
    }
  }

  function renderDate (dateObj) {
    const date = new Date(dateObj)
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()
  }

  function setUserAndRedirect (){
    props.setCase(props.caseObj)
    redirect(props.caseObj.id)
  }

  function updatePlacementAndRedirect () {
    fetch(`http://localhost:3000/checked/${props.placement.id}`, {
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
        props.checkPlacement(response)
        redirect(props.caseObj.id)
      }
    })
  }

  function renderPlacementPeriod(){
    const start = new Date(props.placement.period.split(",")[0])
    const end = new Date(props.placement.period.split(",")[1])
    const convertedStart = start.getMonth()+1 + "/" + start.getDate() + "/" + start.getFullYear()
    const convertedEnd = end.getMonth()+1 + "/" + end.getDate() + "/" + end.getFullYear()

    return (<p className="casecard-placement-period">From {convertedStart} to {convertedEnd}</p>)
  }


    return(
      <div className="listingcard">
        <div onClick={props.userType === 'host' ? ()=> updatePlacementAndRedirect() : ()=> setUserAndRedirect()}>
          <div className='listingcard-title-address'>
            <h4>CASE ID # {props.caseObj.id}</h4>
            <h5>Guest Type: {props.caseObj.guest_type}</h5>
          </div>
          <div className="listingcard-image-title">
              {props.caseObj.image_url ? <img src={props.caseObj.image_url} alt="case profile"/> : <img src={case_image}/>}
            <div className="casecard-details">
              <p>Number of Members: {props.caseObj.num_members}</p>
              <p>Guest Type: {props.caseObj.guest_type}</p>
              <p>Creation Date: {renderDate(props.caseObj.created_at)}</p>
              {props.userType === 'host' ? <p style={{fontWeight: 'bold'}}>{props.placement.status.toUpperCase()}</p> : null}
            </div>
          </div>
        </div>
          <div className="validate-cancel-buttons">
            {props.userType === 'host' && props.placement.status === 'pending'? <button onClick={validateRequest}>VALIDATE REQUEST</button> : null}
            {props.userType === 'host' && props.placement.status === 'pending'? <button onClick={cancelRequest}>CANCEL REQUEST</button> : null}
          </div>
        <div className='casecard-status-container'>
          {props.userType === 'host' ? renderPlacementPeriod() : null}
          {props.userType === 'caseworker' ? renderStatus(): null}
        </div>
      </div>
    )

}

export default connect(generateMSP(["userType", "currentDate", "currentDate", "allCases"]), {approveOrCancelPlacement, setCase, checkPlacement})(CaseCard)
