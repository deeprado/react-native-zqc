import React, {Component} from 'react';
import {View} from 'react-native';
// import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import ButtonWithBg from '../../components/ButtonWithBg';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';
import TextNotice from '../../components/TextNotice';

class ResetPassword extends Component {
  static navigationOptions = {
    title: '重置密码',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'ResetPassword';
  }

  componentDidMount() {
    this.timerSend = setInterval(() => {
      let {screen, setScreenState} = this.props;
      let {secondsToSend} = screen[this.screenId];
      if (secondsToSend > 0) {
        setScreenState(this.screenId, {secondsToSend: secondsToSend - 1});
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerSend);
  }

  submit() {
    // dismissKeyboard();

    let {
      navigation,
      input,
      errorFlash,
      validateInput,
      resetPassword,
    } = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {account, password, code} = input[this.screenId];
      let mobile, email;
      if (account.match(/^\d+$/) !== null) {
        mobile = account;
      } else {
        email = account;
      }
      resetPassword({
        mobile,
        email,
        password,
        code,
        cbOk: () => {
          errorFlash('重设成功，请使用新密码登录。');
          navigation.goBack();
        },
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
    let {account, password, code} = input[this.screenId];
    let {secondsToSend} = screen[this.screenId];

    return (
      <Layout screenId={this.screenId}>
        <TextNotice>通过发送验证码来重设密码。</TextNotice>
        <Form>
          <FormItem icon="account-circle" containerStyle={{borderTopWidth: 0}}>
            <TextInput
              placeholder="输入手机号或绑定邮箱"
              returnKeyType="next"
              defaultValue={account}
              maxLength={50}
              onChangeText={text =>
                saveInput(this.screenId, {account: text.trim()})
              }
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </FormItem>
          <FormItem icon="lock">
            <TextInput
              placeholder="输入新密码"
              returnKeyType="next"
              secureTextEntry
              defaultValue={password}
              maxLength={20}
              onRef={ref => {
                this.refPassword = ref;
              }}
              onChangeText={text =>
                saveInput(this.screenId, {password: text.trim()})
              }
              onSubmitEditing={() => this.refVerifyCode.focus()}
            />
          </FormItem>
          <FormItem icon="vpn-key">
            <TextInput
              placeholder="输入验证码"
              maxLength={4}
              keyboardType="numeric"
              returnKeyType="done"
              defaultValue={code}
              onRef={ref => {
                this.refVerifyCode = ref;
              }}
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
              '发送验证码' +
              (secondsToSend > 0 ? ' (' + secondsToSend + ')' : '')
            }
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 1}}
            disable={secondsToSend > 0 || account === ''}
            onPress={
              secondsToSend === 0
                ? () => {
                    // dismissKeyboard();
                    let cbOk = () => {
                      errorFlash('发送成功。');
                      setScreenState(this.screenId, {secondsToSend: 30});
                    };
                    if (account.match(/^\d+$/) !== null) {
                      sendVerifyCode({by: 'mobile', mobile: account, cbOk});
                    } else {
                      sendVerifyCode({by: 'email', email: account, cbOk});
                    }
                  }
                : null
            }
          />
          <ButtonWithBg
            text="重设密码"
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 1}}
            onPress={() => this.submit()}
          />
        </View>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {input, screen} = state;
  return {
    input,
    screen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
