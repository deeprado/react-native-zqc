/**
 * 欢迎页
 * @flow
 * **/

import React, {Component} from 'react';
import {StyleSheet, View, Image, Alert, InteractionManager} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../redux/actions/index';

const zqcIconPng = require('../assets/img/zqc-icon-middle.png');

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {navigation, reset, processingTask, errorFlash, isLogined} = this.props;

    InteractionManager.runAfterInteractions(() => {
      let {isReset} = navigation.state.params || {};

      if (isReset) {
        reset();
      }

      let cbLogined = user => {
        // if (user && user.nickname && user.avatarType && user.gender) {
        if (Object.keys(user).length > 0) {
          navigation.navigate('AppPage');
        } else {
          navigation.navigate('RegisterProfile');
        }
      };

      isLogined({
        cbOk: ({user, settings}) => {
          if (user) {
            cbLogined(user);
          } else {
            navigation.navigate('Panel');
          }
        },
        cbFail: error => {
          Alert.alert('启动出错', error.message, [
            {text: '重试', onPress: () => navigation.navigate('SplashPage')},
          ]);
        },
      });
    });

    // this.timer = setTimeout(() => {
    //   InteractionManager.runAfterInteractions(() => {
    //     navigation.navigate('AppPage', {
    //       theme: this.theme,
    //     });
    //   });
    // }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{flex: 1}} resizeMode="center" source={zqcIconPng} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => {
  let {persist, network, object, account} = state;
  return {
    persist,
    network,
    object,
    account,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
