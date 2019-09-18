import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { connect } from "react-redux";

const { width, height } = Dimensions.get('screen');

class AddCreditComplete extends React.Component {

  render() {

    return (
      <View
      style={{width: 400, height: 150}}
      >
      <Text
      onPress={this.props.handleDetails}
      style={styles.closeMore}>
      X</Text>
      <Image
      style={styles.complete}
      source={require("../assets/icons/confirmed.png")}/>
      <Text
      style={styles.addedLitre}>
      {this.props.LitresBought}
      </Text>
      <Text
      style={styles.completeText}>
      Added to your balance!
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    shadowColor: "#272727",
    shadowOffset: {width: 8, height: 10},
    shadowRadius: 8,
    shadowOpacity: 0.8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontSize: 20,
    color: 'white',
    left: 80,
    top: 45
  },
  complete: {
    width: 50,
    height: 50,
    left: 163,
    top: 30
  },
  completeText: {
    color: 'white',
    top: 40,
    fontSize: 20,
    width: width,
    textAlign: "center"
  },
  addedLitre: {
    color: 'white',
    top: 35,
    fontSize: 30,
    width:width,
    textAlign: 'center',
    fontWeight: "700"
  }
});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(AddCreditComplete);
