import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ApiResultError, ERROR_CODE_DUPLICATED} from '../../error';
import * as actions from '../../redux/actions';

import Layout from '../../components/Layout';
import NavButton from '../../components/NavButton';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';
import TextNotice from '../../components/TextNotice';
import ButtonWithBg from '../../components/ButtonWithBg';

class EditProfileEmail extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {};
    return {
      title: '修改邮箱',
      headerLeft: () => (
        <NavButton onPress={() => navigation.goBack()}>取消</NavButton>
      ),
      headerRight: () => <NavButton onPress={onDone}>完成</NavButton>,
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileEmail';
  }

  componentDidMount() {
    let {navigation, object, account, saveInput} = this.props;
    let user = object.users[account.id];

    navigation.setParams({
      onDone: () => this.submit(),
    });

    if (user.email) {
      saveInput(this.screenId, {email: user.email});
    }

    this.timerSend = setInterval(() => {
      let {screen, setScreenState} = this.props;
      let {secondsToSend} = screen[this.screenId];
      if (secondsToSend > 0) {
        setScreenState(this.screenId, {secondsToSend: secondsToSend - 1});
      }
    }, 1000);
  }

  componentWillUnmount() {
    let {resetInput} = this.props;
    resetInput(this.screenId);
    clearInterval(this.timerSend);
  }

  submit() {
    let {
      navigation,
      handleError,
      errorFlash,
      input,
      validateInput,
      updateAccount,
    } = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId],
        cbOk: () => navigation.goBack(),
        cbFail: error => {
          if (error instanceof ApiResultError) {
            if (error.code === ERROR_CODE_DUPLICATED) {
              errorFlash('邮箱已注册过。');
              return;
            }
          }
          handleError(error);
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
    let {email, code} = input[this.screenId];
    let {secondsToSend} = screen[this.screenId];

    return (
      <Layout screenId={this.screenId}>
        <Form>
          <FormItem icon="email" containerStyle={{borderTopWidth: 0}}>
            <TextInput
              placeholder="输入邮箱"
              returnKeyType="next"
              defaultValue={input[this.screenId].email}
              autoFocus
              onChangeText={text =>
                saveInput(this.screenId, {email: text.trim()})
              }
              onSubmitEditing={() => this.refVerifyCode.focus()}
            />
          </FormItem>
          <FormItem icon="vpn-key">
            <TextInput
              placeholder="输入验证码"
              maxLength={4}
              keyboardType="numeric"
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
        <TextNotice>如果没有收到邮件，请检查垃圾箱。</TextNotice>
        <ButtonWithBg
          text={
            '发送验证码' + (secondsToSend > 0 ? ' (' + secondsToSend + ')' : '')
          }
          textStyle={{fontSize: 16}}
          disable={secondsToSend > 0 || email === ''}
          onPress={
            secondsToSend === 0
              ? () => {
                  let cbOk = () => {
                    errorFlash('发送成功。');
                    setScreenState(this.screenId, {secondsToSend: 30});
                  };
                  sendVerifyCode({by: 'email', email, cbOk});
                }
              : null
          }
        />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {input, screen, object, account} = state;
  return {
    input,
    screen,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileEmail);
