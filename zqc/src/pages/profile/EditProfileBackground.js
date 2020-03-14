import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SCREEN_WIDTH} from '../../config';
import * as Constant from '../../const';
import logger from '../../logger';

import * as actions from '../../redux/actions';
import * as helpers from '../../helpers';

import Layout from '../../components/Layout';
import NavButton from '../../components/NavButton';
import Image from '../../components/Image';
import TextNotice from '../../components/TextNotice';
import ButtonWithBg from '../../components/ButtonWithBg';

class EditProfileBackground extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {};
    return {
      title: '设置主页背景',
      headerLeft: () => (
        <NavButton onPress={() => navigation.goBack()}>取消</NavButton>
      ),
      headerRight: () => <NavButton onPress={onDone}>完成</NavButton>,
    };
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileBackground';
  }

  componentDidMount() {
    let {navigation, object, account, saveInput} = this.props;
    let {
      backgroundType,
      backgroundName,
      backgroundFile,
    } = helpers.userFromCache(object, account.id);

    navigation.setParams({
      onDone: () => this.submit(),
    });

    saveInput(this.screenId, {backgroundType, backgroundName, backgroundFile});
  }

  submit() {
    // dismissKeyboard();

    let {
      navigation,
      input,
      validateInput,
      updateAccount,
      uploadFile,
    } = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {backgroundType, backgroundName, backgroundImage} = input[
        this.screenId
      ];
      let cbOk = () => navigation.goBack();
      if (backgroundType === 'builtin') {
        updateAccount({update: {backgroundType, backgroundName}, cbOk});
      } else if (backgroundType === 'custom') {
        if (!backgroundImage) {
          cbOk();
          return;
        }
        uploadFile({
          path: backgroundImage.path,
          mime: backgroundImage.mime,
          cbOk: file =>
            updateAccount({
              update: {backgroundType, backgroundId: file.id},
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
          <Image
            source={helpers.userBackgroundSource(input[this.screenId], 'large')}
            style={styles.background}
          />
          <TextNotice>从内置里选取</TextNotice>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            {Array.from(Constant.RES_USER_BACKGROUNDS.entries(), ([k, v]) => (
              <Image
                key={k}
                source={v}
                onPress={() =>
                  saveInput(this.screenId, {
                    backgroundType: 'builtin',
                    backgroundName: k,
                  })
                }
                containerStyle={{margin: 5}}
                style={styles.backgroundBuiltin}
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
                  title: '设置主页背景',
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
                      backgroundType: 'custom',
                      backgroundImage: {
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
  background: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 3) / 4,
    alignSelf: 'center',
  },
  backgroundBuiltin: {
    width: 50,
    height: 50,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileBackground);
