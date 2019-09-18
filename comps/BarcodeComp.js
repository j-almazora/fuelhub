import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";

import Barcode from 'react-native-barcode-builder';

class BarcodeComp extends React.Component {

  render() {

    return (
      <View style={styles.bottomhalf}>
      <Text
      style={{textAlign: "center", fontSize: 18, marginTop: 20}}>
      Scan to Redeem
      </Text>
      <View
      style={{
        borderTopColor: '#e08247',
        borderTopWidth: 3, marginTop: 10, marginBottom: 10, width: 200
      }}
      >
      <TouchableOpacity
      style={{marginTop: 10, textAlign: 'center'}}
      onPress={this.props.handleRedeem}
      >
      <Barcode
      value="Hello World" format="CODE39"
      width= '1'
      height= '150'
      />
      </TouchableOpacity>
      </View>
      </View>

    );

  }
}

const styles = StyleSheet.create({
  bottomhalf:{
    backgroundColor: "white",
    width: Dimensions.get('window').width,
    height: '70%',
    alignItems: 'center',
    textAlign: 'center'
  },
});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(BarcodeComp);
