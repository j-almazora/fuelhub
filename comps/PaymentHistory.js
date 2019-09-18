import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';

import { connect } from "react-redux";

import { ChangePage } from "../redux/actions";

const { width, height } = Dimensions.get('screen');

class PaymentHistory extends React.Component {

  handleGoBack=()=>{
    this.props.dispatch(ChangePage(3));
  }
  render() {

    var transactionList = this.props.transactions.map((obj, i)=>{

      var timestampSeconds = obj.datePurchased.seconds;

      var date = new Date(timestampSeconds).getTime();

      return <View
      style={{width:320, marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#F45400'}}>
      <Text style={{color: "white", fontSize: 30}}>{obj.stationName}</Text>
      <Text style={{color: "white", textAlign: "left", fontSize: 20}}>
      Bought Litres: {obj.litresBought}L
      </Text>
      <Text style={{color: "gray", fontSize: 16}}>
      $ Purchased: {obj.amountPurchased}</Text>
      <Text style={{color: "gray", fontSize: 16}}>
      Gas Price: {obj.gasPrice}</Text>
      <Text style={{color: "gray", fontSize: 16, marginBottom:10}}>Date Purchased: {obj.datePurchased.toDate().toDateString()}</Text>
      </View>
    })

    return (
      
        <ImageBackground
        style={styles.mainContainer}
        source={require("../assets/BGgrey.png")}>
        <TouchableOpacity
        onPress={this.handleGoBack}
        style={styles.goBack}>
          <Image
          source={require("../assets/icons/goback.png")}
          style={{width:20, height:20}}/>
        </TouchableOpacity>
        <Text
        style={styles.welcome}>
        HISTORY
        </Text>
        <Image
        source={require("../assets/icons/4x/line.png")}
        style={{width:250, left:-40}}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        {transactionList}
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
      fontSize: 30,
      width: Dimensions.get('window').width,
      color: "white",
      position: 'absolute',
      textAlign: "center",
      top: 55,
      left:-55,
      textTransform: 'uppercase',
    },
    goBack: {
      top: 60,
      left:30,
      position:'absolute',
      zIndex:200
    }
  });

function mapStateToProps(state) {
  return {
    curPage:state.currentPage.page,
    firstName:state.currentPage.firstname,
    location:state.currentPage.currentLocation,
    transactions:state.currentPage.transactions
  }
}

export default connect(mapStateToProps)(PaymentHistory);
