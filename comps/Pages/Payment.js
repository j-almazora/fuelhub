import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, ImageBackground, Image, Animated } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { AddCredit } from "../../redux/actions";

import Redeem from "../Redeem";
import BarcodeComp from "../BarcodeComp";

import { Dropdown } from 'react-native-material-dropdown';

const { width, height } = Dimensions.get('screen');

class Payment extends React.Component {

  state = {
    selectedStation: "",
    stationName: "",
    total: 0,
    litresToUse: 0,
    showBarcode: false,
    amountRedeem: 0,
    opacity:new Animated.Value(0)
  }

  handleSelectedStation = (value) => {
    var station = value.split(":");
    var stationName = station[0];
    var total = parseFloat(station[1]).toFixed(2);

    this.state.selectedStation = station;
    this.state.stationName = stationName;
    this.state.total = total;

  }

  handleToggleBarcode = () => {
  
    if(!this.state.stationName == "") {
    if (parseInt(this.state.litresToUse) < 1) {
      Alert.alert(
        "Oops!",
        "You cannot redeem less than 1 Litre."
        ) 
    } else if 
      (parseInt(this.state.litresToUse) > this.state.total) {
        Alert.alert(
          "Oops!",
          "That's too much. Please enter amount less than your balance."
          )
      } else {
      this.setState({
        showBarcode: !this.state.showBarcode
      })
    }
  } else {
    Alert.alert(
      "Oops!",
      "You must select a station"
      )
  }
  }

  handleLitresToUse = (litres) => {
    this.setState({
      litresToUse: litres
    })
  }

  handleRedeem = () => {
    var redeemTransaction = {
      Station_Name: this.state.stationName,
      Litres_Bought: -(this.state.litresToUse)+"L",
      Date_Purchased: firebase.firestore.FieldValue.serverTimestamp(),
      userID: this.props.curUserID,
    }; 
    
    if (this.state.litresToUse === 0) {
      Alert.alert(
        "Oops!",
        "You cannot redeem any litres because you do not have any litres bought.");
    } else {
    Alert.alert(
      "Great!",
      (this.state.litresToUse)+ "L USED");
    }
    this.props.dispatch(AddCredit(redeemTransaction, this.props.curUserID));
    this.setState({
      showBarcode: false
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
  

  render() {

    let data = [];

    var stationsMap = new Map();
    this.props.transactions.forEach(station => {
      if (stationsMap.has(station.stationName)) {
        var total = +parseFloat(stationsMap.get(station.stationName)).toFixed(2)
        + +parseFloat(station.litresBought).toFixed(2);
        stationsMap.set(station.stationName, total);
      } else {
        stationsMap.set(station.stationName, station.litresBought);
      }
    });

    Array.from(stationsMap).map(([stationName, total]) => {
      data.push({ value: stationName + ": " + parseFloat(total).toFixed(2) + "L" })
    })

    return (

      <Animated.View style={[styles.mainContainer, {opacity:this.state.opacity}]}>

      <ImageBackground
      style={styles.tophalf}
      source={require("../../assets/BGgrey.png")}>

      <Image
      style={{width: 140, height: 140, marginTop: 130, alignSelf: 'center'}}
      source={require("../../assets/icons/profile.png")}
      />

      <Text
      style={{color: "#e45e0a", textAlign: "center", fontSize: 18, paddingTop:10}}>
      {this.props.firstName} {this.props.lastName}
      </Text>

      <Dropdown
     value="Select"
     data={data}
     style={{ textAlign: "center", marginLeft: 20, fontSize: 18 }}
     baseColor="white"
     textColor="white"
     itemColor="grey"
     selectedItemColor="#e45e0a"
     valueExtractor={({ value }) => value}
     dropdownMargins={{ min: 40, max: 40 }}
     containerStyle={{ width: 200, marginLeft: 85 }}
     onChangeText={(value) => { this.handleSelectedStation(value) }}
     />
      </ImageBackground>

      <View style={styles.bottomhalf}>
      {(this.state.showBarcode) ?
        <BarcodeComp
        litresToUse={this.state.litresToUse}
        handleRedeem={this.handleRedeem.bind(this)} />
        :
        <Redeem
        handleLitresToUse={this.handleLitresToUse.bind(this)}
        litresToUse={this.state.litresToUse}
        handleToggleBarcode={this.handleToggleBarcode.bind(this)}
        />}
      </View>
      </Animated.View>
    );
    }
    }

const styles = StyleSheet.create({
    mainContainer: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    },

    tophalf:{
    width: width,
    height: 400,
    },

    bottomhalf:{
    backgroundColor: "#505050",
    width: Dimensions.get('window').width,
    height: '55%',
    alignItems: 'center'
    },

    profileInfo:{
    width: Dimensions.get('window').width,
    height: 100,
    left: 50,
    marginTop: 50,
    flex: 1
    },

    profileInput:{
    color: '#fefefe',
    fontSize:15,
    paddingTop: 10,
    paddingBottom: 10,
    }
    });

  function mapStateToProps(state) {
    return {
      curPage: state.currentPage.page,
      firstName: state.currentPage.firstname,
      lastName:state.currentPage.lastname,
      curUserID: state.currentPage.userID,
      transactions: state.currentPage.transactions
    }
  }

  export default connect(mapStateToProps)(Payment);
