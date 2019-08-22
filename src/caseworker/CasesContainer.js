import React from 'react'
import CaseCardContainer from './CaseCardContainer'
import Stats from '../components/Stats'
import CasePage from './CasePage'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class CasesContainer extends React.Component {

  renderStatusData(){
    const approved = []
    const pending = []
    const cancelled = []
    const awaiting = []

    for (let i = 0; i < this.props.cases.length; i ++) {
      if (this.props.cases[i].placements.length === 0) {
        awaiting.push("awaiting")
      }
      for (let j = 0; j < this.props.cases[i].placements.length; j ++) {
        let thisPlacement = this.props.cases[i].placements[j]
        // const a = new Date(thisPlacement.period.split(",")[0])
        // const b = new Date(this.props.currentDate)

        //if all placements are in the past, should push to awaiting
        if (thisPlacement.status === 'approved') {
          approved.push(thisPlacement)
        } else if (thisPlacement.status === 'pending') {
          pending.push(thisPlacement)
        } else if (thisPlacement.status === 'cancelled') {
          cancelled.push(thisPlacement)
        }
      }
    }

    return [approved.length, pending.length, cancelled.length, awaiting.length]
  }


  renderGuestData(){
    const arr = this.props.cases.map(caseObj => {
      return caseObj.guest_type
    })
    const count = {}
    for (let i = 0; i < arr.length; i ++) {
      let type = arr[i]
      count[type] = count[type] ? count[type] + 1 : 1;
    }
    return {"labelArr": Object.keys(count), "dataArr": Object.values(count)}
  }



  render(){

    return (
      <div className="cases-container">
        <Stats data={this.renderStatusData()} guestData={this.renderGuestData()} charttype={"cases"}/>
        <CaseCardContainer history={this.props.history}/>
      </div>
    )
  }
}

export default connect(generateMSP(["placements", "cases", "currentDate"]))(CasesContainer)
