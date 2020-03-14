import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR} from '../config';
import * as utils from '../utils';

import * as helpers from '../helpers';
import * as actions from '../redux/actions/index';

import Layout from '../components/Layout';
import Block from '../components/Block';
import BlockItem from '../components/BlockItem';
import Text from '../components/Text';
import Image from '../components/Image';
import TextWithIcon from '../components/TextWithIcon';
import Button from '../components/Button';
import ButtonWithBg from '../components/ButtonWithBg';

class Mine extends Component {
  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Mine';
  }

  refresh(cbFinish) {
    let {accountInfo} = this.props;

    let finished = 0;
    accountInfo({cbFinish: () => finished++});
    utils.waitingFor({
      condition: () => finished === 1,
      cbFinish,
    });
  }

  render() {
    let {
      navigation,
      screen,
      object,
      account,
      disableLoading,
      enableLoading,
      setScreenState,
      logout,
    } = this.props;
    let {refreshing} = screen[this.screenId] || {refreshing: false};

    let user = helpers.userFromCache(object, account.id);
    if (!user) {
      return null;
    }

    return (
      <Layout screenId={this.screenId}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                disableLoading();
                setScreenState(this.screenId, {refreshing: true});
                this.refresh(() => {
                  setScreenState(this.screenId, {refreshing: false});
                  enableLoading();
                });
              }}
            />
          }>
          <Block containerStyle={{flexDirection: 'row'}}>
            <Image
              source={helpers.userAvatarSource(user, 'middle')}
              style={styles.userAvatar}
              containerStyle={{marginRight: 5}}
            />
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 25,
                }}>
                <TextWithIcon
                  icon={user.gender === 'm' ? 'person' : 'person'}
                  text={user.nickname}
                  style={{fontSize: 14, color: COLOR.textEmpha}}
                />
                <Button
                  text="编辑资料"
                  onPress={() => navigation.navigate('EditProfile')}
                  containerStyle={{margin: 0, padding: 5}}
                  textStyle={{fontSize: 12}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 25,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TextWithIcon
                    icon="thumb-up"
                    text={helpers.numberText(user.stat.liked)}
                    containerStyle={{marginRight: 5}}
                  />
                  <TextWithIcon
                    icon="add-box"
                    text={helpers.numberText(user.stat.post)}
                  />
                </View>
              </View>
              <View style={{justifyContent: 'center', height: 50}}>
                <Text>{user.intro || '暂无签名'}</Text>
              </View>
            </View>
          </Block>

          <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
            <BlockItem
              leftIcon="settings"
              leftText="设置"
              rightIcon="keyboard-arrow-right"
              onPress={() => navigation.navigate('Settings')}
              leftIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: 0}}
            />
          </Block>

          <Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
            <BlockItem
              leftIcon="info"
              leftText="关于"
              rightIcon="keyboard-arrow-right"
              onPress={() => navigation.navigate('About')}
              leftIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: 0}}
            />
          </Block>
          <ButtonWithBg
            text="退出当前帐号"
            onPress={() =>
              logout(() => navigation.navigate('SplashPage', {isReset: true}))
            }
            textStyle={{fontSize: 16}}
            containerStyle={{marginTop: 20}}
          />
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

function mapStateToProps(state) {
  let {screen, object, account} = state;
  return {
    screen,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
