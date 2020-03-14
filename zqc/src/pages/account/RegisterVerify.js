import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import ButtonWithBg from '../../components/ButtonWithBg';
import TextNotice from '../../components/TextNotice';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';

class RegisterVerify extends Component {
  static navigationOptions = {
    title: '验证手机',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'RegisterVerify';
  }

  componentDidMount() {
    let {navigation, saveInput, setScreenState} = this.props;
    let {mobile, password} = navigation.state.params;
    saveInput(this.screenId, {mobile, password});
    setScreenState(this.screenId, {secondsToSend: 30});

    this.timerSend = setInterval(() => {
      let {screen, setScreenState} = this.props;
      let {secondsToSend} = screen[this.screenId];
      if (secondsToSend > 0) {
        setScreenState(this.screenId, {secondsToSend: secondsToSend - 1});
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.timerSend && clearInterval(this.timerSend);
  }

  submit() {
    let {navigation, input, validateInput, register, security} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {mobile, password, code} = input[this.screenId];
      register({
        csrfToken: security.csrfToken,
        mobile,
        password,
        code,
        cbOk: () => navigation.navigate('RegisterProfile'),
      });
    });
  }

  render() {
    let {
      input,
      screen,
      errorFlash,
      saveInput,
      setScreenState,
      sendVerifyCode,
    } = this.props;
    let {code, mobile} = input[this.screenId];
    let {secondsToSend} = screen[this.screenId];

    return (
      <Layout screenId={this.screenId}>
        <TextNotice>验证码短信已发送，请注意查收。</TextNotice>
        <Form>
          <FormItem icon="vpn-key" containerStyle={styles.formItemBox}>
            <TextInput
              placeholder="输入验证码"
              maxLength={4}
              keyboardType="numeric"
              defaultValue={code}
              onChangeText={text =>
                saveInput(this.screenId, {code: text.trim()})
              }
              onSubmitEditing={() => this.submit()}
            />
          </FormItem>
        </Form>
        <View style={{flexDirection: 'row'}}>
          <ButtonWithBg
            text={
              '重发' + (secondsToSend > 0 ? ' (' + secondsToSend + ')' : '')
            }
            containerStyle={{flex: 1}}
            disable={secondsToSend > 0}
            onPress={
              secondsToSend === 0
                ? () => {
                    let cbOk = () => {
                      errorFlash('发送成功。');
                      setScreenState(this.screenId, {secondsToSend: 30});
                    };
                    sendVerifyCode({by: 'mobile', mobile, cbOk});
                  }
                : null
            }
          />
          <ButtonWithBg
            text="下一步"
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 2}}
            onPress={() => this.submit()}
          />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  formItemBox: {borderTopWidth: 0},
});

function mapStateToProps(state) {
  let {input, screen, security} = state;
  return {
    input,
    screen,
    security,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterVerify);
