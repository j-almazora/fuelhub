import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { GoToMap } from "../../redux/actions";

import Purchase from "./Purchase";

const { width, height } = Dimensions.get('screen');

class GasStation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowingDetails: false
    }

    this.handleDetails = this.handleDetails.bind(this);

  }

  handleDetails = () => {
    this.setState({
      isShowingDetails: !this.state.isShowingDetails
    })
  }

  goToMap = (addr, station) => {
    console.log(addr);
    console.log(station);
    var mapPage = {
      page: 4,
      addr: addr,
      station:station
    };
    this.props.dispatch(GoToMap(mapPage));
  }

  render() {

    var gasStation = this.props.gasStation;
    var curLogo = <Image 
    style={styles.gasStationLogo}
    source={require("../../assets/icons/fuelhub_logo.png")}/>

    console.log(gasStation.station)

    if (gasStation.station == "Chevron") {
      curLogo = <Image style={[styles.gasStationLogo,{ padding: 10 }]}
      source={{uri:("https://images.gasbuddy.io/b/31.png")}}/>
    } else if (gasStation.station == "Esso") {
      curLogo = <Image style={styles.gasStationLogo}
      source={{uri:("https://images.gasbuddy.io/b/13.png")}}/>
    } else if (gasStation.station == "Petro-Canada") {
      curLogo = <Image style={styles.gasStationLogo}
      source={{uri:("https://images.gasbuddy.io/b/100.png")}}/>
    } else if (gasStation.station == "Shell") {
      curLogo = <Image style={styles.gasStationLogo}
      source={{uri:("https://images.gasbuddy.io/b/122.png")}}/>
    } else if (gasStation.station == "Husky") {
      curLogo = <Image style={styles.gasStationLogo}
      source={{uri:("https://images.gasbuddy.io/b/68.png")}}/>
    } else if (gasStation.station == "Mobil") {
      curLogo = <Image style={styles.gasStationLogo}
      source={{uri:("https://images.gasbuddy.io/b/92.png")}}/>
    }

    return (
      
      <View key={this.props.index}>
      <TouchableOpacity
      onPress={this.goToMap.bind(this, gasStation.addr,gasStation.station)}
      style={styles.gasInfo}>
      <TouchableOpacity
        onPress={this.handleDetails}
        style={styles.buyButton}>
          <Image
          style={{width:50, height:55}}
          source={require("../../assets/icons/cart.png")}></Image>
        </TouchableOpacity>
      <Text style={styles.gasNameInfo}>
      {gasStation.station}
      </Text>
      <Text style={styles.AddressInfo}>
      {gasStation.addr}
      </Text>
      <Text style={styles.gasPriceInfo}>
      {gasStation.price}
      </Text>
      </TouchableOpacity>
      {curLogo}
      <Purchase
      isShowing={this.state.isShowingDetails}
      handleDetails={this.handleDetails}
      gasStationInfo={gasStation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buyButton: {
    width: 60,
    height: 65,
    right: 10,
    marginTop: 10,
    zIndex: 10,
    position: 'absolute'
  },
  gasInfo: {
    borderStyle: "solid",
    backgroundColor: "#505050",
    borderRadius: 5,
    width: Dimensions.get('window').width,
    height: 100,
    marginBottom: 20,
    marginTop: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowColor: "black",
  },
  gasNameInfo: {
    fontSize: 26,
    color: "white",
    textAlign: "left",
    fontWeight: "400",
    marginTop: 26,
    width: 260,
    left: 90,
    textTransform: 'uppercase',
  },
  gasPriceInfo: {
    textAlign: "right",
    right: 15,
    color: "#F45400",
    fontSize: 18,
    marginTop: -5,
  },
  AddressInfo: {
    textAlign: "left",
    color: "darkgray",
    fontSize: 16,
    left:90,
    fontFamily: 'Rajdhani'
  },
  gasStationLogo: {
    left: 20,
    position: 'absolute',
    width: 50,
    height: 50,
    marginTop: 35,
    paddingRight:10,
    padding:5
  }
});

function mapStateToProps(state) {
  return {
    curPage: state.currentPage.page,
    curLogo: state.currentPage.logo,
  }
}

export default connect(mapStateToProps)(GasStation);
