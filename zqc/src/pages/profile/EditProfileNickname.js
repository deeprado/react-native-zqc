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

class EditProfileNickname extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {};
    return {
      title: '设置昵称',
      headerLeft: () => (
        <NavButton onPress={() => navigation.goBack()}>取消</NavButton>
      ),
      headerRight: () => <NavButton onPress={onDone}>完成</NavButton>,
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileNickname';
  }

  componentDidMount() {
    let {navigation, object, account, saveInput} = this.props;
    let user = object.users[account.id];

    navigation.setParams({
      onDone: () => this.submit(),
    });

    if (user.nickname) {
      saveInput(this.screenId, {nickname: user.nickname});
    }
  }

  componentWillUnmount() {
    let {resetInput} = this.props;
    resetInput(this.screenId);
  }

  submit() {
    let {
      navigation,
      input,
      errorFlash,
      handleError,
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
              errorFlash('昵称重复。');
              return;
            }
          }
          handleError(error);
        },
      });
    });
  }

  render() {
    let {input, saveInput} = this.props;

    return (
      <Layout screenId={this.screenId}>
        <Form>
          <FormItem icon="person" containerStyle={{borderTopWidth: 0}}>
            <TextInput
              placeholder="输入昵称"
              returnKeyType="done"
              defaultValue={input[this.screenId].nickname}
              autoFocus
              maxLength={20}
              onChangeText={text =>
                saveInput(this.screenId, {nickname: text.trim()})
              }
              onSubmitEditing={() => this.submit()}
            />
          </FormItem>
        </Form>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {input, object, account} = state;
  return {
    input,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileNickname);
