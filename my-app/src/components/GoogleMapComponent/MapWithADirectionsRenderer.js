import React from 'react'
import { relative } from 'upath';
/* eslint-disable no-undef */

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnODhpeIHWNJAzM2C7DR8Xn3UhMJ7z9kE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `340px` }} />,
    mapElement: <div style={{ height: `90%`,marginTop:"25px",borderRadius:"5px" }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      navigator.geolocation.getCurrentPosition((position)=>{
        DirectionsService.route({
         
          origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          destination: new google.maps.LatLng(35.218395,  -80.811001),
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
            trafficModel: 'optimistic'
          }
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log(result.routes[0].legs[0].distance.text)
            this.setState({
              directions: result,
              time:result.routes[0].legs[0].duration.text,
              distance:result.routes[0].legs[0].distance.text
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        })},
        (error) => 
          DirectionsService.route({
          
              destination: new google.maps.LatLng(35.218395,  -80.811001),
              travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                console.log(result)
                this.setState({
                  directions: "none"
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

   
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={new google.maps.LatLng(35.218395,  -80.811001)}
  >
    {props.directions && props.time && <DirectionsRenderer directions={props.directions} />}
    <div className="white" style={{position:"relative",bottom:"45px", width:"200px",fontWeight:"bold", fontSize: "1.1rem",borderRadius:"5px"}}>
   Distance:{props.distance} <div >Estimated Time: {props.time}</div> </div>
  </GoogleMap>
);



export default MapWithADirectionsRenderer 