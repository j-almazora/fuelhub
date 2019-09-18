import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { ChangePage } from "../../redux/actions";

import GasStation from "./GasStation";
import Loading from "./Loading";

const { width, height } = Dimensions.get('screen');

class GasComp extends React.Component {

  state = {
    gasPrices: [],
    details:false
  }

  componentWillMount=()=>{
    fetch("https://testserver555.herokuapp.com/fuelhubdata",{headers:{
      "latitude":this.props.location.latitude,
      "longitude":this.props.location.longitude
    }})
    .then((resp)=>resp.json())
    .then((respJson)=>{
      this.setState({
        gasPrices: respJson
      })
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  sortPrice=(arr)=>{
    arr.sort(function(x, y) {
      if (x.price < y.price) {
        return -1;
      }
      if (x.price > y.price) {
        return 1;
      }
      return 0;
    });
    return arr;
  }

  handleButton=()=>{
    this.props.dispatch(ChangePage(7));
  }


  render() {

    if (this.state.gasPrices.length > 0) {
      this.state.gasPrices = this.sortPrice(this.state.gasPrices)
    }

    var gasPrices = this.state.gasPrices.slice(1,6)


    var gasStationsList = gasPrices.map((obj, i)=>{
      return <GasStation gasStation={obj} key={i}/>
    })

    return (
      <ImageBackground
      style={styles.mainContainer}
      source={require("../../assets/BGgrey.png")}>
      <TouchableOpacity
      onPress={this.handleButton}
      style={{right:20, top: 30, position:'absolute'}}>
        <Image
        source={require("../../assets/icons/4x/historyicon.png")}
        style={{width:35, height:30}}/>
      </TouchableOpacity>
      <Image
      source={require("../../assets/icons/signup_icon.png")}
      style={{width:40, height:40, marginBottom:5}}/>
      <Text
      style={{fontSize:18, color:'white'}}>
      {this.props.firstName} {this.props.lastName}</Text>
      <Text
      style={styles.welcome}>
      FuelHub
      </Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
      {(this.state.gasPrices.length===0)? <Loading/> :
        <View>{gasStationsList}</View>}
        </View>
        </ScrollView>
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 10,
    },
    mainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100,
      paddingBottom: 50,
      bottom: 0,
      width: width,
      height: height,
    },
    welcome: {
      fontSize: 40,
      width: Dimensions.get('window').width,
      color: "white",
      position: 'absolute',
      textAlign: "center",
      top: 50,
    },
  });

  function mapStateToProps(state){
    return {
      curPage:state.currentPage.page,
      firstName:state.currentPage.firstname,
      location:state.currentPage.currentLocation,
      lastName:state.currentPage.lastname,
    }
  }

  export default connect(mapStateToProps)(GasComp);
