import React from 'react';
import { Text, View } from 'react-native';

import { connect } from "react-redux";

import LottieView from 'lottie-react-native';

class Loading extends React.Component {

  render() {
    return (
      <View style={{margin:30}}>
      <LottieView
        source={require('../../assets/icons/soda_loader.json')}
        autoPlay
        loop
        style={{width: 150, height: 150, marginTop: 15, alignSelf: 'center'}}
      ></LottieView>
      <Text
      style={{ fontSize: 20, color: '#F45400', padding: 30, margin:30, textAlign:"center"}}>
      Please wait...
      </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Loading);
