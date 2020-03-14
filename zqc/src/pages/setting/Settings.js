import React, {Component} from 'react';
import {Switch} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {VIDEO_RATES} from '../../const';
import * as actions from '../../redux/actions';

import Layout from '../../components/Layout';
import Block from '../../components/Block';
import BlockItem from '../../components/BlockItem';

class Settings extends Component {
  static navigationOptions = {
    title: '设置',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Settings';
  }

  render() {
    let {
      navigation,
      account,
      setAccountSettings,
      updateAccountSettings,
    } = this.props;
    let {settings} = account;

    let playRateWifi = VIDEO_RATES.find(
      v => v.value === settings.video.playRate.wifi,
    );
    let playRateMobile = VIDEO_RATES.find(
      v => v.value === settings.video.playRate.mobile,
    );
    let uploadRateWifi = VIDEO_RATES.find(
      v => v.value === settings.video.uploadRate.wifi,
    );
    let uploadRateMobile = VIDEO_RATES.find(
      v => v.value === settings.video.uploadRate.mobile,
    );

    let usedAmountMonth = (
      settings.storage.usedAmountMonth / Math.pow(1024, 3)
    ).toFixed(2);
    let quota = Math.round(settings.storage.quota / Math.pow(1024, 3));

    return (
      <Layout screenId={this.screenId}>
        <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <BlockItem
            leftText="本月已用存储"
            rightText={`${usedAmountMonth}G / ${quota}G`}
            containerStyle={{borderTopWidth: 0}}
          />
        </Block>

        <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <BlockItem
            leftText="WIFI网络自动播放"
            rightComponent={
              <Switch
                value={settings.video.autoPlay.wifi}
                onValueChange={value => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      autoPlay: {
                        ...settings.video.autoPlay,
                        wifi: value,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                }}
              />
            }
            containerStyle={{borderTopWidth: 0}}
          />
          <BlockItem
            leftText="移动网络自动播放"
            rightComponent={
              <Switch
                value={settings.video.autoPlay.mobile}
                onValueChange={value => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      autoPlay: {
                        ...settings.video.autoPlay,
                        mobile: value,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                }}
              />
            }
          />
        </Block>

        <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <BlockItem
            leftText="WIFI网络播放画质"
            rightText={playRateWifi.label}
            rightIcon="keyboard-arrow-right"
            onPress={() =>
              navigation.navigate('SelectRate', {
                title: '选择WIFI网络播放画质',
                selected: playRateWifi.value,
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      playRate: {
                        ...settings.video.playRate,
                        wifi: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              })
            }
            containerStyle={{borderTopWidth: 0}}
          />
          <BlockItem
            leftText="移动网络播放画质"
            rightText={playRateMobile.label}
            rightIcon="keyboard-arrow-right"
            onPress={() =>
              navigation.navigate('SelectRate', {
                title: '选择移动网络播放画质',
                selected: playRateMobile.value,
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      playRate: {
                        ...settings.video.playRate,
                        mobile: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              })
            }
          />
        </Block>

        <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <BlockItem
            leftText="WIFI网络上传画质"
            rightText={uploadRateWifi.label}
            rightIcon="keyboard-arrow-right"
            onPress={() =>
              navigation.navigate('SelectRate', {
                title: '选择WIFI网络上传画质',
                selected: uploadRateWifi.value,
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      uploadRate: {
                        ...settings.video.uploadRate,
                        wifi: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              })
            }
            containerStyle={{borderTopWidth: 0}}
          />
          <BlockItem
            leftText="移动网络上传画质"
            rightText={uploadRateMobile.label}
            rightIcon="keyboard-arrow-right"
            onPress={() =>
              navigation.navigate('SelectRate', {
                title: '选择移动网络上传画质',
                selected: uploadRateMobile.value,
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      uploadRate: {
                        ...settings.video.uploadRate,
                        mobile: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              })
            }
          />
        </Block>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {account} = state;
  return {
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
