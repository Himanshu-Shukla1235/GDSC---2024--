import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  state = {
    selectedPlace: {
      name: "Example Location"
    }
  };

  onMarkerClick = (props, marker, e) => {
    // Handle marker click event
  };

  onInfoWindowClose = () => {
    // Handle info window close event
  };

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes")
})(MapContainer);
