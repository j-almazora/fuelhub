import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import { connect } from "react-redux";

class Redeem extends React.Component {

  render() {
    return (
      <View>

      <Text
      style={{fontSize: 20, color: 'white', top: 40, textAlign: 'center'}}>
      Litres To Use:
      </Text>
      <TextInput
      onChangeText={(litres)=>this.props.handleLitresToUse(litres)}
      placeholder="L"
      placeholderTextColor="#e45e0a"
      style={styles.amount}>
      </TextInput>
      <TouchableOpacity
      onPress={this.props.handleToggleBarcode}
      style={{width: 50, height:50, marginTop: 30}}>
      <Image
      source={require('../assets/icons/confirmed.png')}
      style={{width:50, height:50, marginTop: 20, marginLeft: 50, textAlign: 'center'}}/>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  amount: {
    backgroundColor: "#232323",
    marginTop: 50,
    width: 150,
    height: 45,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: 'white'
  },
});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(Redeem);
