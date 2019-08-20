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
        const a = new Date(thisPlacement.period.split(",")[0])
        const b = new Date(this.props.currentDate)
        const aDate = a.getMonth()+1 + "/" + a.getDate() + "/" + a.getFullYear()
        const bDate = b.getMonth()+1 + "/" + b.getDate() + "/" + b.getFullYear()
        debugger
        if (aDate === bDate) {
          awaiting.push(thisPlacement)
        } else if (Date.parse(thisPlacement.period.split(",")[0]) < Date.parse(this.props.currentDate)) {
          awaiting.push(thisPlacement)
        } else if (thisPlacement.status === 'approved') {
          approved.push(thisPlacement)
        } else if (thisPlacement.status === 'pending') {
          pending.push(thisPlacement)
        } else if (thisPlacement.status === 'cancelled') {
          cancelled.push(thisPlacement)
        }
      }
    }

    //check for empty placement Arrays


    return [approved.length, pending.length, cancelled.length, awaiting.length]

  }

  // getNumByStatus(status){
  //   const placements = this.props.placements.filter(placement => {
  //     return placement.status === status
  //   })
  //   return placements.length
  // }


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
