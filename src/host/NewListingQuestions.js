import React from 'react'
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import {addListing, addToAllListing} from '../actions/actions'
import Flickity from 'react-flickity-component'
import caseImg from '../images/caseImg.svg'
import listing from '../images/listing.svg'
import profile from '../images/profile.svg'


const TOKEN = "=pk.eyJ1IjoiZWthdHN1dGEiLCJhIjoiY2p6Y3NkaTB3MDk5czNscjAybnExOWVsayJ9.60d9hzRE5skVKsj6jsAV_w"


class NewListingQuestions extends React.Component {

  state = {
    title: '',
    streetNumber: '',
    streetName: '',
    city: '',
    state: '',
    zipcode: '',
    address: '',
    room_type: '',
    capacity: 0,
    languages: [],
    description: '',
    household_type: '',
    guest_preference: '',
    children: null,
    provisions: [],
    img_url: "https://cdn.filestackcontent.com/7GIpMWTnQnWBuZXKRTI0",
    currentSlide: 0,
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

  handleSubmit = event => {
    event.preventDefault()
    debugger
    const search = encodeURI(this.state.address)
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?autocomplete=true&access_token=pk.eyJ1IjoiZWthdHN1dGEiLCJhIjoiY2p6Y3NkaTB3MDk5czNscjAybnExOWVsayJ9.60d9hzRE5skVKsj6jsAV_w`)
    .then(resp => resp.json())
    .then(resp => {
      fetch("http://localhost:3000/newlisting", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          listing: this.state,
          latitude: resp.features[0].geometry.coordinates[1],
          longitude: resp.features[0].geometry.coordinates[0],
          user_id: this.props.currentUser.id
        })
      })
      .then(resp => resp.json())
      .then(response => {
        this.props.addListing(response)
        this.props.addToAllListing(response)
      })
      .then(() => this.props.history.push('/listings'))
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

  setTrueFalse = event => {

    if (event.target.innerText === "YES") {
      this.setState({
        children: true
      })
    }
    if (event.target.innerText === "NO") {
      this.setState({
        children: false
      })
    }
  }

  renderSlides(){
    switch (this.state.currentSlide) {
      case 0:
      return (
        <div className="carousel-cell">
          <h3>Enter a Title for your Listing</h3>
          <div className='question-field'>
            <div></div>
            <input type="text" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title"/>
          </div>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
        </div>
      )
      case 1:
      return (
        <div className="carousel-cell">
          <h3>Enter your Address</h3>
          <div className='question-field'>
            <div className="back-button">
              <button title="back" onClick={this.previousSlide}>BACK</button>
            </div>
            <input type="text" name="address" value={this.state.address} onChange={this.handleInput} placeholder="Address"/>
            <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
            </div>
          </div>
        </div>
      )
      case 2:
      return (
        <div className="carousel-cell">
        <h3>Select Your Room Type</h3>
          <div className='question-field'>
          <div className="back-button">
            <button title="back" onClick={this.previousSlide}>BACK</button>
          </div>
          <div className='radio-options'>
            <div className='radio-option'>
            <input onChange={this.handleInput} type="radio" name="room_type" value="Room(s) in your home" checked={this.state.room_type === "Room(s) in your home"}/>
            <p>Room(s) in your home</p>
            </div>
            <div className='radio-option'><input onChange={this.handleInput} type="radio" name="room_type" value="Room(s) in another property" checked={this.state.room_type === "Room(s) in another property"}/>
            <p>Room(s) in another property</p></div>
            <div className='radio-option'><input onChange={this.handleInput} type="radio" name="room_type" value="Space in a living room(or other shared room) at home" checked={this.state.room_type === "Space in a living room(or other shared room) at home"}/>
            <p>Space in a living room(or other shared room) at home</p></div>
            <div className='radio-option'><input onChange={this.handleInput} type="radio" name="room_type" value="Self-contained property" checked={this.state.room_type === "Self-contained property"}/>
            <p>Self-contained property</p></div>
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
          <h3>Enter the Capacity for your Listing</h3>
          <div className='question-field'>
          <div className="back-button">
            <button title="back" onClick={this.previousSlide}>BACK</button>
          </div>
            <input type="number" name="capacity" value={this.state.capacity} onChange={this.handleInput} placeholder="Capacity"/>
            <div className="next-button">
              <button onClick={this.nextSlide}>NEXT</button>
            </div>
          </div>
        </div>
      )
      case 4:
      return (
        <div className="carousel-cell">
          <h3>Give us a brief description about your listing</h3>
          <div className='question-field'>
          <div className="back-button">
            <button title="back" onClick={this.previousSlide}>BACK</button>
          </div>
            <textarea name="description" value={this.state.description} onChange={this.handleInput} placeholder="Description"/>
            <div className="next-button">
              <button onClick={this.nextSlide}>NEXT</button>
            </div>
          </div>
        </div>
      )
      case 5:
      return (
        <div className="carousel-cell">
        <h3>Select your Household Type</h3>
        <div className='question-field household-type'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
          <div className='radio-options household'>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Single Woman" checked={this.state.household_type === 'Single Woman'}/>
            <p>Single Woman</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Single Man" checked={this.state.household_type === 'Single Man'}/>
            <p>Single Man</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Couple" checked={this.state.household_type === 'Couple'}/>
            <p>Couple</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Family with Children" checked={this.state.household_type === 'Family with Children'}/>
            <p>Family with Children</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Gay/Lesbian" checked={this.state.household_type === 'Gay/Lesbian'}/>
            <p>Gay/Lesbian</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="household_type" onChange={this.handleInput} value="Siblings" checked={this.state.household_type === 'Siblings'}/>
            <p>Siblings</p>
            </div>
          </div>
          <div className="specify-other">
          <p>If not listed above, specify here:</p>
          <input name="household_type" onChange={this.handleInput} value={this.state.household_type} placeholder="Specify Other Household Type"/>
          </div>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
        </div>
        </div>
      )
      case 6:
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
      case 7:
      return (
        <div className="carousel-cell">
        <h3>Select Any Additional Provisions you are willing to offer, if any</h3>
        <div className='question-field'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
          <select name="provisions" multiple="" onChange={this.handleMultipleInput}>
            <option value="" disabled selected hidden>Select any additional provisions</option>
            {this.props.provisions.map(provision => {
              return <option value={provision}>{provision}</option>
            })}
          </select>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
        </div>
        <div>
          {this.state.provisions.length > 0 ? this.renderSelected("provision") : null}
        </div>
        </div>
      )
      case 8:
      return (
        <div className="carousel-cell">
        <h3>Select Guest Preference, if you have one</h3>
        <div className='question-field'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
          <div className='radio-options household'>
            <div className='radio-option household'>
            <input type="radio" name="guest_preference" onChange={this.handleInput} value="Single Woman" checked={this.state.guest_preference === 'Single Woman'}/>
            <p>Single Woman</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="guest_preference" onChange={this.handleInput} value="Single Man" checked={this.state.guest_preference === 'Single Man'}/>
            <p>Single Man</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="guest_preference" onChange={this.handleInput} value="Family" checked={this.state.guest_preference === 'Family'}/>
            <p>Family</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="guest_preference" onChange={this.handleInput} value="Elderly" checked={this.state.guest_preference === 'Elderly'}/>
            <p>Elderly</p>
            </div>
            <div className='radio-option household'>
            <input type="radio" name="guest_preference" onChange={this.handleInput} value="Couple" checked={this.state.guest_preference === 'Couple'}/>
            <p>Couple</p>
            </div>
          </div>
          <div className="next-button">
            <button onClick={this.nextSlide}>NEXT</button>
          </div>
        </div>
        </div>
      )
      case 9:
      return (
        <div className="carousel-cell">
        <h3>Are you OK with hosting children or infants?</h3>
        <div className='question-field'>
        <div className="back-button">
          <button title="back" onClick={this.previousSlide}>BACK</button>
        </div>
        <div className='yes-or-no-container'>
          <button className='yes-or-no-button' onClick={this.setTrueFalse} style={this.state.children === true ? {backgroundColor: 'pink'} : null}>YES</button>
          <button className='yes-or-no-button' onClick={this.setTrueFalse} style={this.state.children === false ? {backgroundColor: 'pink'} : null}>NO</button>
        </div>
        <div className="next-button">
          <button onClick={this.nextSlide}>NEXT</button>
        </div>
        </div>
        </div>
      )
      case 10:
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
              img_url: res.filesUploaded[0].url
            })
          }}
          />
          <input onClick={this.handleSubmit} type="submit" value="Submit"/>
        </div>
        </div>
      )
    }
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <div className="form">
        {this.renderSlides()}
        </div>
      </div>
    )
  }
}





export default connect(generateMSP(["userType", "currentUser", "languages", "provisions"]), {addListing,addToAllListing})(NewListingQuestions)
