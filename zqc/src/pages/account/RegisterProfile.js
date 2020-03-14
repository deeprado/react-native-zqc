import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import ButtonWithBg from '../../components/ButtonWithBg';
import TextNotice from '../../components/TextNotice';
import Profile from '../profile/Profile';

class RegisterProfile extends Component {
  static navigationOptions = {
    title: '完善资料',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'RegisterProfile';
  }

  render() {
    let {navigation, object, account, errorFlash} = this.props;
    let user = object.users[account.id];

    return (
      <Layout screenId={this.screenId}>
        <ScrollView>
          <TextNotice>帐号注册成功，请完善资料。</TextNotice>
          <Profile navigation={navigation} screenId={this.screenId} />
          <ButtonWithBg
            text="完成"
            onPress={() => {
              if (user.nickname && user.avatarType && user.gender) {
                navigation.navigate('AppPage');
              } else {
                errorFlash('请填写完基本资料。');
              }
            }}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {object, account} = state;
  return {
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfile);
