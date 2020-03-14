import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Platform, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Config from '../../config';
import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import Image from '../../components/Image';
import Block from '../../components/Block';
import BlockItem from '../../components/BlockItem';
import TextNotice from '../../components/TextNotice';

const iconMiddlePng = require('../../assets/img/zqc-icon-middle.png');
const {width} = Dimensions.get('window');

class About extends Component {
  static navigationOptions = {
    title: '关于',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'About';
  }

  render() {
    let {account, checkAppUpdate} = this.props;
    let {
      settings: {betaUser},
    } = account;

    return (
      <Layout screenId={this.screenId}>
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <ScrollView style={{}}>
            <Image source={iconMiddlePng} style={styles.logo} />
            <Block containerStyle={{paddingVertical: 0}}>
              <BlockItem
                leftText="当前版本"
                rightText={Config.VERSION}
                containerStyle={{borderTopWidth: 0}}
              />
              {Platform.OS === 'android' ? (
                <BlockItem
                  leftText="版本更新"
                  rightText="立即检查"
                  rightIcon="keyboard-arrow-right"
                  onPress={() => checkAppUpdate({betaUser, silent: false})}
                />
              ) : null}
            </Block>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 45,
              left: 0,
              width,
            }}>
            <TextNotice
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              Copyright © 你在球场 All Rights Reserved.
            </TextNotice>
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

function mapStateToProps(state) {
  let {account} = state;
  return {
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
