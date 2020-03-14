import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  InteractionManager,
  StatusBar,
  Platform,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, STATUS_BAR_HEIGHT} from '../config';
import * as utils from '../utils';
import {navToBootstrap, navToTab} from '../../redux/navigator/routeUtil';

import Layout from '../../components/Layout';
import Image from '../../components/Image';

// import * as actions from '../../redux/actions/index';
import {processingTask} from '../../redux/actions/processing';
import {errorFlash} from '../../redux/actions/error';
import {isLogined} from '../../redux/actions/account';

class Bootstrap extends Component {
  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Bootstrap';
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let {
        navigation,
        reset,
        processingTask,
        errorFlash,
        isLogined,
      } = this.props;
      let {isReset} = navigation.state.params || {};

      if (isReset) {
        reset();
      }

      let cbLogined = user => {
        if (user.nickname && user.avatarType && user.gender) {
          navToTab(navigation);
        } else {
          navigation.navigate('RegisterProfile');
        }
      };

      processingTask('正在检测网络和获取位置');
      utils.waitingFor({
        condition: () => {
          let {persist, network} = this.props;
          return network.isConnected && persist.rehydrated;
        },
        cbOk: () => {
          processingTask('cbOk');
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
                {text: '重试', onPress: () => navToBootstrap(navigation)},
              ]);
            },
          });
        },
        cbFail: () => {
          processingTask('');
          Alert.alert(
            '网络出错',
            '未检测到网络连接，请确保WIFI或移动网络正常可用。',
            [
              {
                text: '重试',
                onPress: () => navToBootstrap(navigation),
              },
              {
                text: '离线模式',
                onPress: () => {
                  let {object, account} = this.props;
                  let user = object.users[account.id];
                  if (user) {
                    cbLogined(user);
                  } else {
                    errorFlash('尚未登录过任何帐号。');
                    navToBootstrap(navigation);
                  }
                },
              },
            ],
          );
        },
        maxTimes: 5,
      });
    });
  }

  render() {
    return (
      <Layout
        screenId={this.screenId}
        containerStyle={{
          marginTop: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
        }}>
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/img/zqc-icon-middle.png')}
            style={{borderRadius: 30}}
          />
          <Text style={styles.title}>在球场</Text>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 32,
    color: COLOR.textEmpha,
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

const mapDispatchToProps = dispatch => ({
  processingTask: task => dispatch(processingTask(task)),
  errorFlash: (error, duration) => dispatch(errorFlash(error, duration)),
  isLogined: (callback, params) => dispatch(isLogined(callback, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);

// export default Bootstrap;
