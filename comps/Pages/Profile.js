import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground, Animated} from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { ChangePage } from "../../redux/actions";
import StationBalance from ".././stationBalance";

const { width, height } = Dimensions.get('screen');

class Profile extends React.Component {

  state={
    opacity:new Animated.Value(0)
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

  handleButton=()=>{
     this.props.dispatch(ChangePage(1));
   }

  render() {

    var stationsMap = new Map();
    this.props.transactions.forEach(station=>{
      if(stationsMap.has(station.stationName)){
        var total = +parseFloat(stationsMap.get(station.stationName)).toFixed(2)
        + +parseFloat(station.litresBought).toFixed(2);
        stationsMap.set(station.stationName,total);
      } else {
        stationsMap.set(station.stationName,station.litresBought);
      }
    });

    var list = Array.from(stationsMap).map(([key, val])=> {
      return <StationBalance stationName={key} total={val}/>
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


      <View
      style={{flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: "space-evenly", paddingTop: 20 }}>
      {list}

      </View>
      </ImageBackground>

      <View style={styles.bottomhalf}>

      <View style={styles.profileInfo}>
      <Text style={styles.profileInput}>Email</Text>
      <Text style={{color: 'gray'}}>{this.props.curEmail}</Text>


      <Text style={styles.profileInput}>Password</Text>
      <Text style={{color: 'gray'}}>***********</Text>


      <Text style={styles.profileInput}>Payment Method</Text>
      <Text style={{color: 'gray'}}>VISA</Text>

      <TouchableOpacity
         onPress={this.handleButton}
         style={styles.login}
         >
         <Text
           style={{color: "#e45e0a", textAlign: "center", fontSize: 18, paddingTop:10}}>
           LOG OUT
         </Text>
       </TouchableOpacity>
      </View>
      </View>
      {/*menu*/}
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
    height: '55%'
  },

   profileInfo:{
     width: Dimensions.get('window').width,
     height: 100,
     left: 50,
     marginTop: 15,
     flex: 1
   },


  profileInput:{
    color: '#fefefe',
    fontSize:15,
    paddingTop: 10,
    paddingBottom: 10,
  },

   login: {
     backgroundColor: "#e6e6e6",
     marginTop: 10,
     marginLeft: 35,
     width: 200,
     height: 45,
     borderRadius: 15,
     shadowColor: '#272727',
     shadowOffset: {width: 8, height: 10},
     shadowRadius: 8,
     shadowOpacity: 0.8
   },

});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page,
    firstName:state.currentPage.firstname,
    lastName:state.currentPage.lastname,
    curEmail:state.currentPage.email,
    transactions:state.currentPage.transactions,
  }
}

export default connect(mapStateToProps)(Profile);
