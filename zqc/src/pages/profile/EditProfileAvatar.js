import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Constant from '../../const';
import logger from '../../logger';

import * as actions from '../../redux/actions';
import * as helpers from '../../helpers';

import Layout from '../../components/Layout';
import NavButton from '../../components/NavButton';
import Image from '../../components/Image';
import TextNotice from '../../components/TextNotice';
import ButtonWithBg from '../../components/ButtonWithBg';

class EditProfileAvatar extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {};
    return {
      title: '设置头像',
      headerLeft: () => (
        <NavButton onPress={() => navigation.goBack()}>取消</NavButton>
      ),
      headerRight: () => <NavButton onPress={onDone}>完成</NavButton>,
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileAvatar';
  }

  componentDidMount() {
    let {navigation, object, account, saveInput} = this.props;
    let {avatarType, avatarName, avatarFile} = helpers.userFromCache(
      object,
      account.id,
    );

    navigation.setParams({
      onDone: () => this.submit(),
    });

    saveInput(this.screenId, {avatarType, avatarName, avatarFile});
  }

  submit() {
    let {
      navigation,
      input,
      validateInput,
      updateAccount,
      uploadFile,
    } = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {avatarType, avatarName, avatarImage} = input[this.screenId];
      let cbOk = () => navigation.goBack();
      if (avatarType === 'builtin') {
        updateAccount({
          update: {avatarType, avatarName},
          cbOk,
        });
      } else if (avatarType === 'custom') {
        if (!avatarImage) {
          cbOk();
          return;
        }
        uploadFile({
          path: avatarImage.path,
          mime: avatarImage.mime,
          cbOk: file =>
            updateAccount({
              update: {avatarType, avatarId: file.id},
              cbOk,
            }),
        });
      }
    });
  }

  render() {
    let {input, saveInput} = this.props;

    return (
      <Layout screenId={this.screenId}>
        <ScrollView>
          <TextNotice>头像</TextNotice>
          <Image
            source={helpers.userAvatarSource(input[this.screenId], 'middle')}
            style={styles.avatar}
          />
          <TextNotice>从内置里选取</TextNotice>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            {Array.from(Constant.RES_USER_AVATARS.entries(), ([k, v]) => (
              <Image
                key={k}
                source={v}
                onPress={() =>
                  saveInput(this.screenId, {
                    avatarType: 'builtin',
                    avatarName: k,
                  })
                }
                containerStyle={{margin: 5}}
                style={styles.avatarBuiltin}
              />
            ))}
          </View>
          <TextNotice>从相册里选取</TextNotice>
          <ButtonWithBg
            text="打开相册"
            textStyle={{fontSize: 16}}
            onPress={() => {
              ImagePicker.showImagePicker(
                {
                  title: '设置头像',
                  chooseFromLibraryButtonTitle: '打开相册',
                  takePhotoButtonTitle: '打开相机',
                  cancelButtonTitle: '取消',
                  mediaType: 'photo',
                  allowsEditing: true,
                  noData: true,
                },
                response => {
                  if (response.didCancel) {
                  } else if (response.error) {
                    logger.error(response.error);
                  } else {
                    saveInput(this.screenId, {
                      avatarType: 'custom',
                      avatarImage: {
                        path: response.uri,
                        mime: 'mime/jpeg',
                        size: response.fileSize,
                        pixelSize: [response.width, response.height],
                      },
                    });
                  }
                },
              );
            }}
          />
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  avatarBuiltin: {
    width: 40,
    height: 40,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileAvatar);
