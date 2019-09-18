import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { AddCredit } from "../../redux/actions";

import AddCreditComplete from "../AddCreditComplete";

const { width, height } = Dimensions.get('screen');

class Purchase extends React.Component {

  state = {
    isShowing:false,
    amount:0,
    addCreditComplete: false,
    LitresBought: 0
  }

  handleAddCredit=()=>{
    var newAmount = this.state.amount;
    console.log("amount to send to db: " + newAmount);

    var LitrePrice = parseFloat(this.props.gasStationInfo.price)
    console.log(LitrePrice)

    var AddedLitres = parseFloat(newAmount / (LitrePrice / 100)).toFixed(2)+"L"
    
    this.state.LitresBought = AddedLitres
    
    if (newAmount < 1) {
      Alert.alert(
        "Oops!",
        "You must make minimum $1 purchase in order to add to tank.");
    } else { 
      
      this.state.addCreditComplete = true;
      var newTransaction={
        Amount_Purchased: "$" + newAmount,
        Station_Name: this.props.gasStationInfo.station,
        Gas_Price:this.props.gasStationInfo.price,
        Litres_Bought: AddedLitres,
        Date_Purchased: firebase.firestore.FieldValue.serverTimestamp(),
        userID: this.props.curUserID,
      }
  
      this.props.dispatch(AddCredit(newTransaction, this.props.curUserID));
    }
  }
  
  handleAmount=(text)=>{
    this.state.amount = text;
  }

  render() {

    var isShowing = this.props.isShowing;

    var details;
    
    if (this.state.addCreditComplete){
      details = <AddCreditComplete 
                  LitresBought = {this.state.LitresBought}
                  handleDetails = {this.props.handleDetails}/>
    } else {
    details = <View style={{width:400, height: 150}}>
    <Text
    onPress={this.props.handleDetails}
    style={styles.closeMore}>
    X</Text>
    <Text style={styles.amountText}>
      AMOUNT:
    </Text>
    <TouchableOpacity
    style={styles.amount}>
    <TextInput
    onChangeText={this.handleAmount}
    placeholder="$"
    placeholderTextColor="#e45e0a"
    style={{color:"#e45e0a", fontSize: 18}}>
    </TextInput>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.add}
    onPress={this.handleAddCredit}>
    <Text
    style={{color: "#F45400", textAlign: "center", fontSize: 22, paddingTop:10}}>
    ADD TO TANK
    </Text>
    </TouchableOpacity>
    </View>
    }
    
    return (
      <View>
      {isShowing && details}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transaction: {
    width: width,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 26,
    backgroundColor: '#505050',
    position: 'absolute',
    zIndex: 100
  },
  add: {
    backgroundColor: "#e6e6e6",
    marginTop: 10,
    marginBottom: 15,
    left: 90,
    width: 200,
    height: 45,
    borderRadius: 15,
  },
  closeMore: {
    right:50,
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    top: 0,
  },
  amount: {
    backgroundColor: "#232323",
    marginTop: 10,
    left: 190,
    width: 120,
    height: 45,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontSize: 20,
    color: 'white',
    left: 80,
    top: 45
  }
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page,
    curUsername:state.currentPage.username,
    curUserID:state.currentPage.userID,
    curBalance:state.currentPage.curBalance
  }
}

export default connect(mapStateToProps)(Purchase);
