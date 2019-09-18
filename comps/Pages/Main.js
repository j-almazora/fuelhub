import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Firebase from '../Firebase';
import * as firebase from 'firebase';

import { connect } from "react-redux";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Map from "./Map";
import Payment from "./Payment";
import Profile from "./Profile";
import Nav from "../Nav";
import Hub from "./Hub";
import PaymentHistory from '../PaymentHistory';

const { width, height } = Dimensions.get('screen');

class Main extends React.Component {
  render() {

    var curPage = <SignIn />;

    var NavPage = <Nav />;

    if(this.props.curPage === 1){
      curPage = <SignIn />
      NavPage = null
    } else if (this.props.curPage === 2){
      curPage = <SignUp />
      NavPage = null
    } else if (this.props.curPage === 3){
      curPage = <Hub />
      NavPage = <Nav />;
    } else if (this.props.curPage === 4){
      curPage = <Map
      addr={this.props.addr}
      station={this.props.station}/>
      NavPage = <Nav />;
    } else if (this.props.curPage === 5){
      curPage = <Payment />
      NavPage = <Nav />;
    } else if (this.props.curPage === 6){
      curPage = <Profile />
      NavPage = <Nav />;
    } else if (this.props.curPage === 7){
      curPage = <PaymentHistory />
      NavPage = null
    }

    return (
      <View style={styles.mainContainer}>
      {curPage}
      {NavPage}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 700,
  },
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page,
    addr:state.currentPage.addr,
    station:state.currentPage.station,
  }
}

export default connect(mapStateToProps)(Main);
