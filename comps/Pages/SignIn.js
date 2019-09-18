import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';

import * as firebase from 'firebase';

import GlobalFont from 'react-native-global-font';

import { connect } from "react-redux";
import { ChangePage, GetUser, CurrentUser, CalcTransactions, CurrentLocation } from "../../redux/actions";


const {width, height} = Dimensions.get('screen');

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.09

class SignIn extends React.Component {

  componentDidMount() {
     let fontName = 'Museo Sans'
     GlobalFont.applyGlobal(fontName)

     navigator.geolocation.getCurrentPosition((position)=>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.props.dispatch(CurrentLocation(initialRegion));
    }, (error) => alert(JSON.stringify(error)),{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    ; 
    }

  state = {
    email:'',
    password:'',
    errorMsg:'',
  }

  handleButton=()=>{
    this.props.dispatch(ChangePage(2));
  }

  handleSignIn=(email, password)=>{
    console.log("handleSignIn Called");
    console.log(email);

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user) => {
      console.log("login successful");
      console.log(user);
      this.props.dispatch(ChangePage(3));
      this.props.dispatch(CurrentUser(user));
      firebase.firestore().collection('users').doc(user.user.uid)
      .get().then((docRef)=>{
        let userData = docRef.data();
        if(userData){
          this.props.dispatch(GetUser(userData));
        }
      })
      .catch(error=>{
        console.log(error);
      });
      this.props.dispatch(CalcTransactions(user.user.uid))
    })
    .catch((error) =>{
      console.log("Login error");
      console.log(error);
      this.setState({
        errorMsg: "Please check again"
      })
    });
  }

  render() {
    
    return (
      <ImageBackground
      style={styles.container}
      source={require("../../assets/BGgrey.png")}
      >

      <Image
      style={{width: 100, height: 100, marginBottom: 10}}
      source={require("../../assets/icons/fuelhub_active3x.png")}
      />
      <Text
      style={{color: "#e6e6e6", fontSize: 40, marginBottom: 20, fontFamily:'Rajdhani'}}>
      FuelHub
      </Text>
      <Text
      style={{color: "#e6e6e6"}}>
      {this.state.errorMsg}
      </Text>
      <View style={styles.inputimages}>
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 4, position: "absolute", zIndex: 1}}
      source={require("../../assets/icons/userSquare.png")}
      />
      <TextInput
      style={styles.signInput}
      placeholder='&nbsp;EMAIL'

      onChangeText={(email)=>this.setState({email})}
      />
      </View>
      <View style={styles.inputimages}>
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 4, position: "absolute", zIndex: 1}}
      source={require("../../assets/icons/passwordSquare.png")}
      />
      <TextInput
      style={styles.signInput}
      placeholder='&nbsp;PASSWORD'
      onChangeText={(password)=>this.setState({password})}
      value={this.state.password}
      secureTextEntry={true}
      />
      </View>
      <TouchableOpacity
      onPress={()=>this.handleSignIn(this.state.email,this.state.password)}
      style={styles.login}
      >
      <Text
      style={{color: "#e45e0a", textAlign: "center", fontSize: 22, paddingTop:10, fontFamily: 'Rajdhani'}}>
      LOG IN
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={this.handleButton} style={styles.signup}>
      <Text
      style={{color: "white", textAlign: "center", fontSize:22, paddingTop:10, fontFamily: 'Rajdhani'}}>
      SIGN UP
      </Text>
      </TouchableOpacity>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  signInput: {
    width: 240,
    height: 45,
    backgroundColor: '#e6e6e6',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 7,
    borderColor: 'white',
    textAlign: 'left',
    margin: 5,
    marginRight: -40,
    paddingLeft: 10
  },
  login: {
    backgroundColor: "#e6e6e6",
    marginTop: 50,
    marginBottom: 15,
    width: 200,
    height: 45,
    borderRadius: 15,
    shadowColor: '#272727',
    shadowOffset: {width: 8, height: 10},
    shadowRadius: 8,
    shadowOpacity: 0.8,
    fontFamily: 'Rajdhani'
  },
  signup: {
    backgroundColor: "#505050",
    width: 200,
    height: 45,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth:1
  } ,
  inputimages: {
    flexDirection: "row",
  },
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page
  }
}

export default connect(mapStateToProps)(SignIn);
