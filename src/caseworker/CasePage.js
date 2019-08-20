import React from 'react'
import CaseProfile from './CaseProfile'
import ListingSuggestions from '../host/ListingSuggestions'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'


class CasePage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    
    return (
      <div className="casepage-container">
      <CaseProfile history={this.props.history} caseObj={this.props.caseObj}/>
      {this.props.currentUser.user_type === 'host' ? null : <ListingSuggestions history={this.props.history} caseObj={this.props.caseObj}/>}
      </div>
    )
  }
}

export default connect(generateMSP(["currentCase", "currentUser"]))(CasePage)
