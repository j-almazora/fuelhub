import React from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import GasComp from "../gasComponents/GasComp";

import { connect } from "react-redux";
import { ChangePage } from "../../redux/actions";

const { width, height } = Dimensions.get('screen');

class Hub extends React.Component {

  state = {
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

  render() {
    return (
      <Animated.View
      style={[styles.mainContainer, {opacity:this.state.opacity}]}
      source={require("../../assets/BGgrey.png")}>
      <GasComp />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page
  }
}

export default connect(mapStateToProps)(Hub);
