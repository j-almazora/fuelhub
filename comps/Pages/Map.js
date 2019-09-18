import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { connect } from "react-redux";

import { CurrentLocation } from "../../redux/actions";

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.09

class Map extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      position: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      addr:"",
      station:"",
      opacity:new Animated.Value(0)
    }

  }

  watchID: ?number = null

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) =>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.props.dispatch(CurrentLocation(lastRegion));
    })
  }

  componentDidMount=()=>{
    Animated.timing(
      this.state.opacity,
      {
        toValue:1,
        duration:400
      }
    ).start();
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
    this.setState({
      markerPosition:{},
      addr: "",
      station: ""
    })
  }

  onRegionChange=(position)=>{
    this.setState({position});
  }

  onRegionChangeComplete=(position)=>{
    this.setState({position});
  }

  componentWillMount=async ()=>{
    this.setState({
      position : this.props.currentLocation,
      addr: this.props.addr,
      station: this.props.station
    })

    var address_to_search = this.props.addr.replace(/\s/g,"+");

    var resp = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address_to_search}&location=49.2578749,-123.263988&radius=1000&key=AIzaSyB7jrShUIvKGiHXSBOd5HZsC5A1x7vnEGQ`);
    var json = await resp.json();

    console.log(json)
    console.log("json stuff", json.results[0].geometry.location);

    var region = {
      latitude: json.results[0].geometry.location.lat,
      longitude: json.results[0].geometry.location.lng,
    }

    this.setState({
      markerPosition: region
    })
  }

  render() {
    return (
      <Animated.View style={[styles.container, {opacity:this.state.opacity}]}>
      <View style={styles.background}>
      <View style={styles.footer}>
      <TouchableOpacity style={{borderRightWidth: 2, borderRightColor: "#F45400", height: 50}}>
      <Text style={{fontSize: 24, paddingTop:10, marginRight:5}}>
      {this.props.station}
      </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 24, paddingTop:10, marginLeft:10}}>
      {this.props.addr}
      </Text>
      </View>
      <View style={styles.header}>
      <Text style={styles.headerText}>{this.props.station} Stations</Text>
      </View>
      <MapView
      style={styles.map}
      zoomEnabled = {true}
      region={this.state.position}
      onRegionChange={this.onRegionChange}
      showsUserLocation = {true}
      followsUserLocation = {false}
      showsMyLocationButton = {true}
      >
      <Marker
      coordinate={this.state.markerPosition}
      image={require('../../assets/icons/gasstationicon.png')}
      style={{width:40}}
      />
      </MapView>
      </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    height:350,
    marginTop: 140,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width:Dimensions.get('window').width,
  },
  header: {
    height: 160,
    top: 0,
    backgroundColor: '#272727',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    alignItems: 'center'
  },
  background: {
    height: Dimensions.get('window').height,
    backgroundColor: '#ececec',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footer: {
    height: 130,
    width: Dimensions.get('window').width,
    backgroundColor: '#ececec',
    position: 'absolute',
    bottom:20,
    left: 20,
    textAlign: 'left',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 34,
    position: 'absolute',
    top: 70,
    textAlign: 'center',
  },
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page,
    currentLocation:state.currentPage.currentLocation
  }
}

export default connect(mapStateToProps)(Map);
