import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import ListingCard from '../host/ListingCard'

import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'
import listingImg from '../images/listing.svg'

const TOKEN = "pk.eyJ1IjoiZWthdHN1dGEiLCJhIjoiY2p6Y3NkaTB3MDk5czNscjAybnExOWVsayJ9.60d9hzRE5skVKsj6jsAV_w"

class Map extends React.Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 40.676172,
      longitude: -73.997929,
      zoom: 9
    }
  };


  renderMarkers(){
    return this.props.allListings.map(listing => {
      return (
        <Marker latitude={parseFloat(listing.latitude)} longitude={parseFloat(listing.longitude)}>
          <img onClick={()=> this.props.history.push(`/listings/${listing.id}`)} src="https://img.icons8.com/officel/16/000000/marker.png"/>
        </Marker>
      )
    })
  }



  render() {
    return (
      <div className='map-container' >
      <ReactMapGL mapboxApiAccessToken="pk.eyJ1IjoiZWthdHN1dGEiLCJhIjoiY2p6Y3NkaTB3MDk5czNscjAybnExOWVsayJ9.60d9hzRE5skVKsj6jsAV_w"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
         children={this.props.children}>
        {this.renderMarkers()}
        </ReactMapGL>
      </div>
    );
  }
}

export default connect(generateMSP(["allListings"]))(Map)
