import React from 'react'
import CaseCard from './CaseCard'
import {generateMSP} from '../actions/msp_template'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CaseCardContainer extends React.Component {

  state = {
    status: null,
    guest_type: null,
    num_members: 0,
    cases: this.props.cases,
    sortOption: null,
    sortProps: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  mapCases(arr){
    return arr.map(caseObj => {
      return (
        <CaseCard history={this.props.history} key={caseObj.id} caseObj={caseObj}/>
      )
    })
  }

  startOrEndDate(caseObj, filterType){
    const futurePlacements = caseObj.placements.filter(placement => {
      return Date.parse(placement.period.split(",")[0]) > Date.parse(this.props.currentDate)
    })
    const approvedPlacements = futurePlacements.filter(placement => {
      return placement.status === 'approved'
    })
    const sortedPlacements = approvedPlacements.sort((a,b) => Date.parse(a.period.split(",")[0]) < Date.parse(b.period.split(",")[0]) ? -1 : 1)
    if (filterType === 'start') {
      return sortedPlacements[0]
    } else {
      return sortedPlacements[1]
    }
  }

  renderCaseCard(){

    if (this.state.status) {
      const filteredCases = this.state.cases.filter(caseObj => {
        return this.renderStatus(caseObj) === this.state.status
      })
      return this.mapCases(filteredCases)
    }
    if (this.state.guest_type){
      const filteredCases = this.state.cases.filter(caseObj => {
        return caseObj.guest_type === this.state.guest_type
      })
      return this.mapCases(filteredCases)
    }
    if (this.state.sortOption === 'creation'){
      const sortedCases = this.state.cases.sort((a,b) => a.created_at < b.created_at ? 1 : -1)
    }
    if (this.state.sortOption === 'start'){
      const filteredCases = this.state.cases.filter(caseObj => {
        return this.renderStatus(caseObj) === "matched"
      })
      const sortedCases = filteredCases.sort((a,b) => {
        const aStart = this.startOrEndDate(a, "start")
        const bStart = this.startOrEndDate(b, "start")
        return aStart < bStart ? -1 : 1
      })
      return this.mapCases(sortedCases)
    }
    if (this.state.sortOption === 'end'){
      const filteredCases = this.state.cases.filter(caseObj => {
        return this.renderStatus(caseObj) === "matched"
      })
      const sortedCases = filteredCases.sort((a,b) => {
        const aStart = this.startOrEndDate(a, "end")
        const bStart = this.startOrEndDate(b, "end")
        return aStart < bStart ? -1 : 1
      })
      return this.mapCases(sortedCases)
    }
    return this.state.cases.map(caseObj => {
      return (
        <CaseCard history={this.props.history} key={caseObj.id} caseObj={caseObj}/>
      )
    })
  }

  renderGuestTypeOptions(){
    const options = this.props.allCases.map(caseObj => {
      return caseObj.guest_type
    })
    const uniqueOptions = [...new Set(options)]
    return uniqueOptions.map(option => {
      return <option value={option}>{option}</option>
    })
  }

  clearSearch = () =>{
    this.setState({
      status: null,
      guest_type: null,
      num_members: 0,
      sortOption: null
    })
  }

  renderStatus(caseObj){
    const futurePlacements = caseObj.placements.filter(placement => {
      return Date.parse(placement.period.split(",")[0]) > Date.parse(this.props.currentDate)
    })
    if (futurePlacements.length === 0) {
      return "awaiting"
    } else {
      const approvedPlacements = futurePlacements.filter(placement => {
        return placement.status === 'approved'
      })
      if (approvedPlacements.length === 0){
        return "pending"
      } else {
        return "matched"
      }
    }
  }
  
  renderFilterOptions(){
    return (
      <div className='filter-options-container'>
        <select name="status" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Status</option>
          <option value="matched">MATCHED</option>
          <option value="pending">PENDING</option>
          <option value="awaiting">AWAITING PLACEMENT</option>
        </select>

        <select name="guest_type" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Filter By Guest Type</option>
          {this.renderGuestTypeOptions()}
        </select>

        <button onClick={this.clearSearch}>Clear Search</button>
      </div>
    )
  }

  renderSortOptions(){
    return (
      <div className='sort-options-container'>
        <select name="sortOption" onChange={this.handleChange}>
          <option value="" disabled selected hidden>Sort By:</option>
          <option value="creation">CREATION DATE</option>
          <option value="start">START OF NEXT PLACEMENT DATE</option>
          <option value="end">END OF NEXT PLACEMENT DATE</option>
        </select>
      </div>
    )
  }

  render(){
    return (
      <div className="card-container">
        <div className="card-container-buttons">
          <Link to="/casequestions"><button className="add-button">ADD CASE</button></Link>
          <div className='sort-dropdown-button'>{this.props.userType === 'caseworker' ? <button  onClick={()=>this.setState({sortProps: !this.state.sortProps})}>SHOW FILTER OPTIONS</button> : null}</div>
        </div>
        {this.state.sortProps ? this.renderFilterOptions() : null}
        {this.state.sortProps ? this.renderSortOptions() : null}
        {this.renderCaseCard()}
      </div>
    )
  }
}

export default connect(generateMSP(["userType", "currentUser", "cases", "allCases", "currentDate"]))(CaseCardContainer)
