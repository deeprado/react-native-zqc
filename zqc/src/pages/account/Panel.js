import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import Image from '../../components/Image';
import Button from '../../components/Button';

const iconMiddlePng = require('../../assets/img/zqc-icon-middle.png');

class Panel extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Panel';
  }

  render() {
    let {navigation} = this.props;

    return (
      <Layout
        screenId={this.screenId}
        containerStyle={{justifyContent: 'center'}}>
        <Image
          source={iconMiddlePng}
          style={{alignSelf: 'center', borderRadius: 15}}
        />
        <Button
          text="登录"
          onPress={() => navigation.navigate('Login')}
          containerStyle={{marginTop: 100}}
          textStyle={{fontSize: 16}}
        />
        <Button
          text="手机号注册"
          onPress={() => navigation.navigate('RegisterMobile')}
          containerStyle={{marginTop: 30}}
          textStyle={{fontSize: 16}}
        />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
