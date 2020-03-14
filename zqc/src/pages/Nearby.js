import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  InteractionManager,
  View,
  Text,
  Modal,
  Platform,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Constant from '../const';
import * as utils from '../utils';
import * as helpers from '../helpers';

import * as actions from '../redux/actions';

import NavButton from '../components/NavButton';
import Layout from '../components/Layout';
import TextNotice from '../components/TextNotice';
import SelectCityAndSport from './account/SelectCityAndSport';

import Post from './nearby/Post';

const tmpPost = {
  id: 1,
  courtId: 20,
  creatorId: 20,
  creator: {
    gender: 'm',
    name: 'deeprado',
    nickname: 'deeprado',
    avatarType: 'builtin',
    avatarName: 'american-football-player',
    avatarImage: null,
    avatarFile: null,
  },
  createTime: '2019-02-01',
  court: {
    name: '亚特兰大',
    location: {
      longitude: 126.551898,
      altitude: 45.828823,
    },
  },
  status: 1,
  text: 'asdfasfasd',
  imageIds: [1, 2, 3, 4],
  imageFiles: [
    {
      id: 1,
      creatorId: 20,
      mime: 'video/mp4',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      playUrl:
        'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
      height: 416,
      width: 1000,
      status: 1,
    },
    {
      id: 2,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      status: 1,
    },
    {
      id: 3,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      status: 1,
    },
    {
      id: 4,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      status: 1,
    },
  ],
  stat: {
    liked: 23,
    commented: 23,
  },
};

const tmpPosts = [
  tmpPost,
  {
    ...tmpPost,
    id: 2,
  },
  {
    ...tmpPost,
    id: 3,
  },
  {
    ...tmpPost,
    id: 4,
  },
];

class Nearby extends Component {
  static navigationOptions = ({navigation}) => {
    let {cityAndSport, onPressCityAndSport} = navigation.state.params || {};
    let button =
      cityAndSport && onPressCityAndSport ? (
        <NavButton onPress={onPressCityAndSport}>{cityAndSport}</NavButton>
      ) : null;
    let navigationOptions = {
      title: '附近',
    };
    if (Platform.OS === 'ios') {
      navigationOptions.headerLeft = button;
    } else {
      navigationOptions.headerRight = button;
    }
    return navigationOptions;
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Nearby';

    this.state = {
      ds: [],
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.account.settings.city.code !==
  //       this.props.account.settings.city.code ||
  //     nextProps.account.settings.sport.code !==
  //       this.props.account.settings.sport.code
  //   ) {
  //     this.setNavParams(nextProps);

  //     this.refresh({props: nextProps});
  //   }
  // }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let {network, location, errorFlash} = this.props;

      this.setNavParams();

      if (!location || !location.position) {
        errorFlash('获取位置失败，请允许在球场使用定位服务。');
      }

      if (network.isConnected) {
        this.refresh();
        this.updateAccountLocation();
      }
    });
  }

  setNavParams(props) {
    props = props || this.props;
    let {navigation, account, setScreenState} = props;
    navigation.setParams({
      cityAndSport:
        account.settings.city.name.substring(0, 2) +
        ' ' +
        account.settings.sport.name +
        ' >',
      onPressCityAndSport: () =>
        setScreenState(this.screenId, {showCityAndSport: true}),
    });
  }

  getRows(props) {
    props = props || this.props;
    let {object} = props;
    let {location, account, post} = props;
    let postIds;
    if (location.city && account.settings.city.code === location.city.code) {
      postIds = post.nearby;
    } else {
      postIds = post.byCity[account.settings.city.code] || [];
    }
    let rows = postIds
      .map(v => helpers.postFromCache(object, v))
      .filter(v => v && v.status === Constant.POST_STATUS_NORMAL);

    if (rows.length <= 0) {
      return tmpPosts;
    }
    return rows;
  }

  updateAccountLocation() {
    let {location, updateAccount} = this.props;
    if (location.position) {
      updateAccount({update: {location: location.position.coords}});
    }
  }

  refresh({props, cbFinish} = {}) {
    props = props || this.props;
    let {location, account, nearbyPosts, postsOfCity} = props;

    let finished = 0;
    if (location.city && account.settings.city.code === location.city.code) {
      nearbyPosts({cbFinish: () => finished++});
    } else {
      postsOfCity({
        cityCode: account.settings.city.code,
        cbFinish: () => finished++,
      });
    }
    utils.waitingFor({
      condition: () => finished === 1,
      cbFinish,
    });
  }

  getMorePosts = posts => {
    let {network, location, account, nearbyPosts, postsOfCity} = this.props;

    if (network.isConnected && posts.length > 0) {
      if (location.city && account.settings.city.code === location.city.code) {
        nearbyPosts({offset: posts[posts.length - 1].createTime});
      } else {
        postsOfCity({
          cityCode: account.settings.city.code,
          offset: posts[posts.length - 1].createTime,
        });
      }
    }
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
    let {
      navigation,
      location,
      network,
      screen,
      account,
      enableLoading,
      disableLoading,
      setScreenState,
      nearbyPosts,
      postsOfCity,
    } = this.props;

    let {refreshing, showCityAndSport} = screen[this.screenId] || {
      refreshing: false,
      showCityAndSport: false,
    };

    let posts = this.getRows();

    return (
      <Layout screenId={this.screenId}>
        {posts.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={posts}
            initialListSize={5}
            pageSize={5}
            keyExtractor={this._keyExtractor}
            renderItem={({item, index}) => {
              return (
                <Post
                  navigation={navigation}
                  screenId={this.screenId}
                  post={item}
                  containerStyle={styles.post}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  disableLoading();
                  setScreenState(this.screenId, {refreshing: true});
                  this.refresh({
                    cbFinish: () => {
                      setScreenState(this.screenId, {refreshing: false});
                      enableLoading();
                    },
                  });
                }}
              />
            }
            onEndReached={() => {
              this.getMorePosts(posts);
            }}
          />
        ) : (
          <TextNotice
            containerStyle={{
              alignSelf: 'center',
            }}>
            {location.city && account.settings.city.code === location.city.code
              ? '附近暂时没有数据，可以切换到其它热门城市看看。'
              : '当前城市暂时没有数据。'}
          </TextNotice>
        )}

        <Modal
          visible={showCityAndSport}
          onRequestClose={() =>
            setScreenState(this.screenId, {showCityAndSport: false})
          }>
          <SelectCityAndSport
            cbDone={() =>
              setScreenState(this.screenId, {showCityAndSport: false})
            }
          />
        </Modal>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  let {location, network, screen, object, account, post} = state;
  return {
    location,
    network,
    screen,
    object,
    account,
    post,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
