import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ApiResultError, ERROR_CODE_DUPLICATED} from '../../error';
import * as actions from '../../redux/actions';

import Layout from '../../components/Layout';
import NavButton from '../../components/NavButton';
import Block from '../../components/Block';
import TextInput from '../../components/TextInput';

class EditProfileIntro extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {};
    return {
      title: '设置个性签名',
      headerLeft: () => (
        <NavButton onPress={() => navigation.goBack()}>取消</NavButton>
      ),
      headerRight: () => <NavButton onPress={onDone}>完成</NavButton>,
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileIntro';
  }

  componentDidMount() {
    let {navigation, object, account, saveInput} = this.props;
    let user = object.users[account.id];

    navigation.setParams({
      onDone: () => this.submit(),
    });

    if (user.intro) {
      saveInput(this.screenId, {intro: user.intro});
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
      validateInput,
      errorFlash,
      handleError,
      updateAccount,
    } = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId],
        cbOk: () => navigation.goBack(),
        cbFail: error => {
          // if (error instanceof ApiResultError) {
          //   if (error.code === ERROR_CODE_DUPLICATED) {
          //     errorFlash('昵称重复。');
          //     return;
          //   }
          // }
          handleError(error);
        },
      });
    });
  }

  render() {
    let {input, saveInput} = this.props;
    return (
      <Layout screenId={this.screenId}>
        <Block>
          <TextInput
            placeholder="输入个性签名，50字以内"
            defaultValue={input[this.screenId].intro}
            autoFocus
            maxLength={50}
            onChangeText={text =>
              saveInput(this.screenId, {intro: text.trim().replace(/\n/, '')})
            }
            onSubmitEditing={() => this.submit()}
            style={{fontSize: 12}}
          />
        </Block>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileIntro);
