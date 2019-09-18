import React from 'react';
import { StyleSheet, View,  TouchableOpacity, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { ChangePage } from '../redux/actions'

class Nav extends React.Component {

  state= {
    hubimg: require("../assets/icons/fuelhub_inactive3x.png"),
    mapimg: require("../assets/icons/location_inactive3x.png"),
    payimg: require("../assets/icons/payment_inactive3x.png"),
    profimg: require("../assets/icons/profile_inactive3x.png")
  }

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page))
  }

  render() {

    if(this.props.curPage === 3){
      this.state.hubimg = require("../assets/icons/fuelhub_active3x.png");
      this.state.mapimg = require("../assets/icons/location_inactive3x.png");
      this.state.payimg = require("../assets/icons/payment_inactive3x.png");
      this.state.profimg = require("../assets/icons/profile_inactive3x.png");
    } else if(this.props.curPage === 4){
      this.state.hubimg = require("../assets/icons/fuelhub_inactive3x.png");
      this.state.mapimg = require("../assets/icons/location_active3x.png");
      this.state.payimg = require("../assets/icons/payment_inactive3x.png");
      this.state.profimg = require("../assets/icons/profile_inactive3x.png");
    } else if(this.props.curPage === 5){
      this.state.hubimg = require("../assets/icons/fuelhub_inactive3x.png");
      this.state.mapimg = require("../assets/icons/location_inactive3x.png");
      this.state.payimg = require("../assets/icons/payment_active3x.png");
      this.state.profimg = require("../assets/icons/profile_inactive3x.png");
    } else if(this.props.curPage === 6){
      this.state.hubimg = require("../assets/icons/fuelhub_inactive3x.png");
      this.state.mapimg = require("../assets/icons/location_inactive3x.png");
      this.state.payimg = require("../assets/icons/payment_inactive3x.png");
      this.state.profimg = require("../assets/icons/profile_active3x.png");
    }

    return (
      <View style={styles.navContainer}>
      <TouchableOpacity
      onPress={this.handlePage.bind(this,3)}
      style={{marginTop: -30, padding: 30}}>
      <Image
      style={{width: 45, height: 45}}
      source={this.state.hubimg}
      />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={this.handlePage.bind(this,4)}
      style={{marginTop: -30, padding: 30}}>
      <Image
      style={{width: 40, height: 40}}
      source={this.state.mapimg}
      />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={this.handlePage.bind(this,5)}
      style={{marginTop: -30, padding: 30}}>
      <Image
      style={{width: 25, height: 43, padding: 0}}
      source={this.state.payimg}
      />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={this.handlePage.bind(this,6)}
      style={{marginTop: -30, padding: 30}}>
      <Image
      style={{width: 32, height: 40, padding: 0}}
      source={this.state.profimg}
      />
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex:1,
    width: Dimensions.get('window').width,
    height: 100,
    position: "absolute",
    bottom: 0,
  },
});

function mapStateToProps(state){
  return {
    curPage:state.currentPage.page
  }
}

export default connect(mapStateToProps)(Nav);
