import React from 'react';
import { Text, View } from 'react-native';

import { connect } from "react-redux";

class StationBalance extends React.Component {

  render() {

    var curTotal = parseFloat(this.props.total).toFixed(2)

    return (
      <View
      style={{flexDirection: 'column', justifyContent: "center" }}
      >

      <Text
      style={{color: "#fefefe", textAlign: "center", fontSize: 15, paddingTop:10}}>
      {this.props.stationName}
      </Text>

      <Text
      style={{color: "#e45e0a", textAlign: "center", fontSize: 12, paddingTop:10}}>
      {curTotal} L
      </Text>

      </View>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(StationBalance);
