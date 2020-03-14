import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ENV_NAMES} from '../../const';

import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import NavButton from '../../components/NavButton';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import ActionSheet from '../../components/ActionSheet';
import ButtonWithBg from '../../components/ButtonWithBg';

import TextInput from '../../components/TextInput';

class Login extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '登录',
      headerRight: () => (
        <NavButton onPress={() => navigation.navigate('ResetPassword')}>
          重设密码
        </NavButton>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Login';
  }

  changeAppEnv(showActionSheetWithOptions) {
    let {app, setAppEnv} = this.props;
    let options = ['生产', '测试', '开发'];
    showActionSheetWithOptions(
      {
        options,
        title: `切换环境（当前为${ENV_NAMES[app.env]}）`,
      },
      buttonIndex => {
        if (buttonIndex === options.findIndex(v => v === '生产')) {
          setAppEnv('production');
        } else if (buttonIndex === options.findIndex(v => v === '测试')) {
          setAppEnv('testing');
        } else if (buttonIndex === options.findIndex(v => v === '开发')) {
          setAppEnv('development');
        }
      },
    );
  }

  submit() {
    let {navigation, input, validateInput, login} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {account, password} = input[this.screenId];
      let username, mobile, email;
      if (account.match(/^\d+$/) !== null) {
        mobile = account;
      } else if (account.match(/^.+@.+$/) !== null) {
        email = account;
      } else {
        username = account;
      }
      login({
        username,
        mobile,
        email,
        password,
        cbOk: user => {
          if (user.nickname && user.avatarType && user.gender) {
            navigation.navigate('AppPage');
          } else {
            navigation.navigate('RegisterProfile');
          }
        },
      });
    });
  }

  render() {
    let {app, input, saveInput} = this.props;
    let {account, password} = input[this.screenId];

    return (
      <Layout screenId={this.screenId}>
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
              placeholder="输入密码"
              returnKeyType="done"
              secureTextEntry
              defaultValue={password}
              maxLength={20}
              onRef={ref => {
                this.refPassword = ref;
              }}
              onChangeText={text =>
                saveInput(this.screenId, {password: text.trim()})
              }
              onSubmitEditing={() => {
                this.submit();
              }}
            />
          </FormItem>
        </Form>
        <ActionSheet
          onPress={() => {
            this.submit();
          }}
          onLongPress={showActionSheetWithOptions =>
            this.changeAppEnv(showActionSheetWithOptions)
          }
          delayLongPress={5000}>
          <ButtonWithBg
            text={`登录${app.env === 'production' ? '' : ENV_NAMES[app.env]}`}
            textStyle={{fontSize: 16}}
          />
        </ActionSheet>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {app, input} = state;
  return {
    app,
    input,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
