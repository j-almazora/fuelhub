import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Dimensions, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { ChangePage } from "../../redux/actions";

const {width, height} = Dimensions.get('screen');

class SignUp extends React.Component {

  state = {
    email:'',
    password:'',
    errorMsg:'',
    firstname:'',
    lastname:'',
  }

  handleSignUp=(email,password,firstname,lastname)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userDoc) => {
      console.log(userDoc);
      firebase.firestore().collection('users').doc(userDoc.user.uid).set({
        email: email,
        firstname: firstname,
        lastname: lastname
             })
             Alert.alert(
               "Welcome!",
               "Please sign in to start."
               );
             console.log("New User Created");
             this.props.dispatch(ChangePage(1))
           })
             .catch((error) =>{
             console.log("Error was found when making a new user");
             console.log(error);
             this.setState({
             errorMsg: "Error"
             })
             Alert.alert(
               "Uh-oh",
               "Please check your information again.");
           });
  }

  handleGoBack=()=>{
    this.props.dispatch(ChangePage(1));
  }

  render() {
    return (
      <ImageBackground
      style={styles.container}
      source={require("../../assets/BGgrey.png")}
      >

      <Image
      style={{width: 120, height: 120, marginTop: -60, marginBottom: 20}}
      source={require("../../assets/icons/signup_icon.png")}
      />

      <View
      style={{
        borderTopColor: '#e08247',
        borderTopWidth: 1, marginTop: 10, marginBottom: 10, width: 300
      }}
      >
      </View>
      <View
      style={{ marginBottom: 20}}
      >
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 20, position: "absolute", zIndex: 1, flexDirection: "row"}}
      source={require("../../assets/icons/userSquare.png")}
      />
      <TextInput
      style={[styles.signUpInput, styles.firstinput]}
      placeholder='FIRST NAME'

      onChangeText={firstname=>this.setState({firstname})}
      value={this.state.firstname}
      />
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 75, position: "absolute", zIndex: 1, flexDirection: "row"}}
      source={require("../../assets/icons/userSquare.png")}
      />
      <TextInput
      style={styles.signUpInput}
      placeholder='LAST NAME'

      onChangeText={lastname=>this.setState({lastname})}
      value={this.state.lastname}
      />
      </View>
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
      <View style={styles.inputimages}>
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 4, position: "absolute", zIndex: 1}}
      source={require("../../assets/icons/mailSquare.png")}
      />
      <TextInput
      style={styles.signUpInput}
      placeholder='EMAIL'
      onChangeText={email=>this.setState({email})}
      value={this.state.email}
      />
      </View>
      <View style={styles.inputimages}>
      <Image
      style={{width: 45, height: 45, marginLeft: -40, marginTop: 4, position: "absolute", zIndex: 1}}
      source={require("../../assets/icons/passwordSquare.png")}
      />
      <TextInput
      style={styles.signUpInput}
      placeholder='PASSWORD'
      onChangeText={(password)=>this.setState({password})}
      value={this.state.password}
      secureTextEntry={true}
      />
      </View>
      <TouchableOpacity
      onPress={this.handleNext}
      style={styles.create}
      onPress={()=> this.handleSignUp(this.state.email,this.state.password, this.state.firstname, this.state.lastname)}
      >
      <Text
      style={{color: "#e45e0a", textAlign: "center", fontSize: 16, paddingTop:12}}>
      CREATE ACCOUNT
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={this.handleGoBack} style={styles.goback}>
      <Text
      style={{color: "white", textAlign: "center", fontSize:18, paddingTop:10}}>
      GO BACK
      </Text>
      </TouchableOpacity>
              </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    justifyContent: 'center',
  },
  keyboard: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpInput: {
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
    paddingLeft: 10,
  },
  firstinput: {
    marginTop: 20
  },
  create: {
    backgroundColor: "#e6e6e6",
    marginTop: 40,
    marginBottom: 15,
    width: 200,
    height: 45,
    borderRadius: 15,
    shadowColor: '#272727',
    shadowOffset: {width: 8, height: 10},
    shadowRadius: 8,
    shadowOpacity: 0.8,
  },
  goback: {
    backgroundColor: "#505050",
    width: 200,
    height: 45,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth:1
  },
  inputimages: {
    flexDirection: "row"
  }

});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page
  }
}

export default connect(mapStateToProps)(SignUp);
