import React from 'react'
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {addCase} from '../actions/actions'

class NewCaseQuestions extends React.Component {
  state = {
    num_members: 0,
    guest_type: '',
    household_preference: '',
    special_notes: '',
    languages: [],
    image_url: 'https://www.rescue.org/sites/default/files/styles/window_width_breakpoints_theme_rescue_large_2x/public/hero/1246/hero-image/20090625_nyc_mcohen_146.jpg?itok=7iq4AVpF',
    currentSlide: 0
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleMultipleInput = event => {
    this.setState({
      [event.target.name]: [...this.state[event.target.name], event.target.value]
    })
  }

  nextSlide = () => {
    this.setState({
      currentSlide: this.state.currentSlide + 1
    })
  }


  previousSlide = () => {
    this.setState({
      currentSlide: this.state.currentSlide - 1
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:3000/newcase", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        case: this.state,
        user_id: this.props.currentUser.id
      })
    })
    .then(resp => resp.json())
    .then(response => {
      this.props.addCase(response)
    })
    .then(() => this.props.history.push('/cases'))
  }

  deselectLanguage = languageItem => {
    const newList = this.state.languages.filter(language => language !== languageItem)
    this.setState({
      languages: newList
    })
  }

  deselectProvision = provisionItem => {
    const newList = this.state.provisions.filter(provision => provision !== provisionItem)
    this.setState({
      provisions: newList
    })
  }

  renderSelected = type => {
    if (type==="language"){
      return this.state.languages.map(language => {
        return (
          <button onClick={() => this.deselectLanguage(language)}>
          {"x " + language}
          </button>
        )
      })
    }
    if (type==="provision"){
      return this.state.provisions.map(provision => {
        return (
          <button onClick={() => this.deselectProvision(provision)}>
          {"x " + provision}
          </button>
        )
      })
    }
  }

  renderQuestions = () => {
    switch (this.state.currentSlide){
      case 0:
      return (
        <div className="carousel-cell">
        <h3>Enter Number of Members for this Case</h3>
        <div className='question-field'>
          <div></div>
          <input type="number" name="num_members" value={this.state.num_members} onChange={this.handleInput} placeholder="Number of Members"/>
        </div>
        <div className="next-button">
          <button onClick={this.nextSlide}>NEXT</button>
        </div>
        </div>
      )
      case 1:
      return (
        <div className="carousel-cell">
        <h3>Select Guest Type</h3>
        <div className='question-field'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
          <div className='radio-options'>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Single Woman" checked={this.state.guest_type ==='Single Woman'}/>
            <p>Single Woman</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Single Man" checked={this.state.guest_type ==='Single Man'}/>
            <p>Single Man</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Family" checked={this.state.guest_type ==='Family'}/>
            <p>Family</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Infant" checked={this.state.guest_type ==='Infant'}/>
            <p>Infant</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Child" checked={this.state.guest_type ==='Child'}/>
            <p>Child</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Elderly" checked={this.state.guest_type ==='Elderly'}/>
            <p>Elderly</p>
            </div>
            <div className='radio-option'>
            <input type="radio" name="guest_type" onChange={this.handleInput} value="Couple" checked={this.state.guest_type ==='Couple'}/>
            <p>Couple</p>
            </div>
            </div>
            <div className="next-button">
              <button onClick={this.nextSlide}>NEXT</button>
            </div>
          </div>
        </div>
      )
      case 2:
      return (
        <div className="carousel-cell">
        <h3>Select Household Preference</h3>
        <div className='case-household'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
          <div className='radio-options household'>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Single Woman" checked={this.state.household_preference === 'Single Woman'}/>
            <p>Single Woman</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Single Man" checked={this.state.household_preference === 'Single Man'}/>
            <p>Single Man</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Couple" checked={this.state.household_preference === 'Couple'}/>
            <p>Couple</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Family with Children" checked={this.state.household_preference === 'Family with Children'}/>
            <p>Family with Children</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Gay/Lesbian" checked={this.state.household_preference === 'Gay/Lesbian'}/>
            <p>Gay/Lesbian</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_preference" onChange={this.handleInput} value="Siblings" checked={this.state.household_preference === 'Siblings'}/>
            <p>Siblings</p>
            </div>
          </div>
          <div className="specify-other">
            <p>If not listed above, specify here:</p>
            <input name="household_preference" onChange={this.handleInput} value={this.state.household_type} placeholder="Specify Other Household Type"/>
          </div>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
        </div>
        </div>
      )
      case 3:
      return (
        <div className="carousel-cell">
          <h3>Select Language(s) spoken at household</h3>
          <div className='question-field'>
          <div className="back-button">
            <button title="back" onClick={this.previousSlide}>BACK</button>
          </div>
            <select name="languages" multiple="" onChange={this.handleMultipleInput}>
              <option value="" disabled selected hidden>Select your languages</option>
              {this.props.languages.map(language => {
                return <option value={language}>{language}</option>
              })}
            </select>
            <div className="next-button">
              <button onClick={this.nextSlide}>NEXT</button>
            </div>
          </div>
          <div>
            {this.state.languages.length > 0 ? this.renderSelected("language") : null}
          </div>
        </div>
      )
      case 4:
      return (
        <div className="carousel-cell">
          <h3>Add any special notes, if any.</h3>
          <div className='question-field'>
          <div className="back-button">
            <button title="back" onClick={this.previousSlide}>BACK</button>
          </div>
        <textarea name="special_notes" value={this.state.special_notes} onChange={this.handleInput} placeholder="Special Notes"/>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
          </div>
        </div>
      )
      case 5:
      return (
        <div className="carousel-cell">
        <h3>Upload Image(s) of your listing</h3>
        <div className='question-field'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
        <ReactFilestack
          apikey={"ASRKTt2smQC6FJUSI8YrSz"}
          onSuccess={(res) => {
            this.setState({
              image_url: res.filesUploaded[0].url
            })
          }}
          />
          <input onClick={this.handleSubmit} type="submit" value="SUBMIT"/>
        </div>
        </div>
      )
    }
  }


  render(){
    console.log("CASE FORM",this.state)
    return (
      <div className='form'>
      {this.renderQuestions()}
      </div>
    )
  }
}




//
//
//
//
// </form>

export default connect(generateMSP(["userType", "currentUser", "languages"]), {addCase})(NewCaseQuestions)
