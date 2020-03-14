import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, SCREEN_WIDTH} from '../../config';

import * as helpers from '../../helpers';
import * as actions from '../../redux/actions';

import Block from '../../components/Block';
import Image from '../../components/Image';
import TextWithIcon from '../../components/TextWithIcon';
import Text from '../../components/Text';
import ActionSheet from '../../components/ActionSheet';
import Icon from '../../components/Icon';

class Post extends Component {
  constructor(props) {
    super(props);
    this.showMoreOps = this.showMoreOps.bind(this);
  }

  showMoreOps(showActionSheetWithOptions) {
    if (!showActionSheetWithOptions) {
      return false;
    }
    let {account, post} = this.props;
    let options = ['分享到微信朋友圈', '分享给微信好友', '举报'];
    if (account.id === post.creatorId) {
      options.push('删除');
    }
    options.push('取消');
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.findIndex(v => v === '取消'),
        destructiveButtonIndex: options.findIndex(v => v === '删除'),
        title: '动态操作',
      },
      buttonIndex => {
        if (buttonIndex === options.findIndex(v => v === '举报')) {
          Alert.alert(
            '举报失败',
            'Lite版暂不支持该功能，请到官网(zaiqiuchang.com)下载完整版体验。',
            [{text: '确认'}],
          );
        } else if (
          buttonIndex === options.findIndex(v => v === '分享到微信朋友圈')
        ) {
          Alert.alert(
            '分享到微信朋友圈失败',
            'Lite版暂不支持该功能，请到官网(zaiqiuchang.com)下载完整版体验。',
            [{text: '确认'}],
          );
        } else if (
          buttonIndex === options.findIndex(v => v === '分享给微信好友')
        ) {
          Alert.alert(
            '分享给微信好友失败',
            'Lite版暂不支持该功能，请到官网(zaiqiuchang.com)下载完整版体验。',
            [{text: '确认'}],
          );
        } else if (buttonIndex === options.findIndex(v => v === '删除')) {
          Alert.alert(
            '删除失败',
            'Lite版暂不支持该功能，请到官网(zaiqiuchang.com)下载完整版体验。',
            [{text: '确认'}],
          );
        }
      },
    );
  }

  render() {
    let {navigation, location, post, containerStyle, onPress} = this.props;
    return (
      <Block onPress={onPress} containerStyle={containerStyle}>
        <View style={{flexDirection: 'row', paddingBottom: 2.5}}>
          <Image
            source={helpers.userAvatarSource(post.creator)}
            style={styles.userAvatar}
            containerStyle={{marginRight: 5}}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 25,
              }}>
              <TextWithIcon
                icon={post.creator.gender === 'm' ? 'person' : 'person'}
                text={post.creator.nickname}
                style={{fontSize: 14, color: COLOR.textEmpha}}
                containerStyle={{paddingVertical: 5}}
              />

              <Text>{helpers.dateText(post.createTime)}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 25,
              }}>
              <TextWithIcon
                icon="location-on"
                text={post.court.name}
                style={{color: COLOR.textEmpha}}
                containerStyle={{paddingVertical: 5}}
              />

              <Text>{helpers.distanceText(location, post.court.location)}</Text>
            </View>
          </View>
        </View>

        {post.text ? <Text style={styles.postText}>{post.text}</Text> : null}

        <View style={styles.postImages}>
          {post.imageFiles.slice(0, 3).map((file, index, array) =>
            file.mime.startsWith('image/') ? (
              <Image
                key={file.id}
                source={helpers.fileImageSource(
                  file,
                  array.length === 1 ? 'large' : 'middle',
                )}
                onPress={() => {
                  let imageFiles = post.imageFiles.filter(v =>
                    v.mime.startsWith('image/'),
                  );
                  let currentIndex = imageFiles.findIndex(
                    v => v.id === file.id,
                  );
                  navigation.navigate('Album', {
                    files: imageFiles,
                    currentIndex,
                  });
                }}
                style={
                  array.length === 1
                    ? styles.largeImage
                    : array.length === 2
                    ? styles.middleImage
                    : styles.smallImage
                }
              />
            ) : (
              <Image
                key={file.id}
                source={helpers.fileImageSource(
                  file,
                  array.length === 1 ? 'large' : 'middle',
                )}
                playIconVisible
                onPress={() =>
                  navigation.navigate('Player', {
                    file,
                  })
                }
                style={
                  array.length === 1
                    ? styles.largeImage
                    : array.length === 2
                    ? styles.middleImage
                    : styles.smallImage
                }
              />
            ),
          )}
        </View>
        {post.imageFiles.length > 3 ? (
          <View
            style={[
              styles.postImages,
              post.imageFiles.length < 6
                ? {justifyContent: 'flex-start'}
                : null,
            ]}>
            {post.imageFiles.slice(3, 6).map((file, index, array) =>
              file.mime.startsWith('image/') ? (
                <Image
                  key={file.id}
                  source={helpers.fileImageSource(file, 'middle')}
                  onPress={() => {
                    let imageFiles = post.imageFiles.filter(v =>
                      v.mime.startsWith('image/'),
                    );
                    let currentIndex = imageFiles.findIndex(
                      v => v.id === file.id,
                    );
                    navigation.navigate('Album', {
                      files: imageFiles,
                      currentIndex,
                    });
                  }}
                  style={[
                    styles.smallImage,
                    post.imageFiles.length < 6 ? {marginRight: 5} : null,
                  ]}
                />
              ) : (
                <Image
                  key={file.id}
                  source={helpers.fileImageSource(file, 'middle')}
                  playIconVisible
                  onPress={() =>
                    navigation.navigate('Player', {
                      file,
                    })
                  }
                  style={[
                    styles.smallImage,
                    post.imageFiles.length < 6 ? {marginRight: 5} : null,
                  ]}
                />
              ),
            )}
          </View>
        ) : null}

        <View style={styles.opBar}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextWithIcon
              icon="thumb-up"
              text={helpers.numberText(post.stat.liked)}
              containerStyle={{marginHorizontal: 5, alignItems: 'center'}}
            />
            <TextWithIcon
              icon="comment"
              text={helpers.numberText(post.stat.commented)}
              containerStyle={{marginHorizontal: 5, alignItems: 'center'}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <ActionSheet
              onPress={showActionSheetWithOptions => {
                this.showMoreOps(showActionSheetWithOptions);
              }}
              onLongPress={showActionSheetWithOptions => {
                this.showMoreOps(showActionSheetWithOptions);
              }}>
              <Icon name="more-vert" style={styles.postOp} />
            </ActionSheet>
          </View>
        </View>
      </Block>
    );
  }
}

let smallImageSize = Math.floor((SCREEN_WIDTH - 30) / 3);
let middleImageSize = Math.floor((SCREEN_WIDTH - 25) / 2);
let largeImageSize = SCREEN_WIDTH - 20;

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  postText: {
    marginTop: 5,
    lineHeight: 16,
  },
  postImages: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallImage: {
    width: smallImageSize,
    height: smallImageSize,
  },
  middleImage: {
    width: middleImageSize,
    height: middleImageSize,
  },
  largeImage: {
    width: largeImageSize,
    height: (largeImageSize * 9) / 16,
  },
  opBar: {
    marginTop: 5,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postOp: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 16,
  },
  liked: {
    color: COLOR.theme,
  },
});

function mapStateToProps(state) {
  let {location, account} = state;
  return {
    location,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
