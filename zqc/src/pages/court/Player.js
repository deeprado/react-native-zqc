import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Video, {TextTrackType} from 'react-native-video';
import Orientation from 'react-native-orientation';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT, NAV_BAR_HEIGHT} from '../../config';
import logger from '../../logger';
import * as Constant from '../../const';
import {flattenStyle} from '../../utils';

import Icon from '../../components/Icon';
import Layout from '../../components/Layout';
import Text from '../../components/Text';
import ActionSheet from '../../components/ActionSheet';

import * as helpers from '../../helpers';
import * as actions from '../../redux/actions/index';

const textTracks = [
  {
    title: 'English CC',
    language: 'en',
    type: TextTrackType.VTT, // "text/vtt"
    uri:
      'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
  },
  {
    title: 'Spanish Subtitles',
    language: 'es',
    type: TextTrackType.SRT, // "application/x-subrip"
    uri:
      'https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt',
  },
];

class Player extends Component {
  static navigationOptions = {
    title: '播放',
  };

  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      maxRate: 1,
      width: null,
      height: null,
      opBarLeft: null,
      opBarTop: null,
      videoHeight: null,
      videoWidth: null,
      videoSource: null,
      orientation: 'PORTRAIT',
    };

    this.screenId = props.screenId || 'Player';

    this.renderControl = this.renderControl.bind(this);
    this.renderRateControl = this.renderRateControl.bind(this);
    this.renderResizeModeControl = this.renderResizeModeControl.bind(this);
    this.renderVolumeControl = this.renderVolumeControl.bind(this);

    this.initData = this.initData.bind(this);
    this._initOrientation = this._initOrientation.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  componentDidMount() {
    let {navigation, network, account, setPlayerState} = this.props;
    let {autoPlay} = navigation.state.params;

    if (!network.isConnected || !network.reach) {
      let message = !network.isConnected ? '网络未连接。' : '未知网络类型';
      Alert.alert('播放出错', message, [
        {text: '确认', onPress: () => navigation.pop()},
      ]);
      return;
    }

    // if (!network.isConnected || !network.reach) {
    //   return null;
    // }

    if (autoPlay === undefined) {
      autoPlay = account.settings.video.autoPlay[network.reach];
    }
    setPlayerState({paused: !autoPlay});

    this.autoHideNavBar();

    this._initOrientation();
    this.initData();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
    let {resetPlayerState} = this.props;
    resetPlayerState();
  }

  _initOrientation = () => {
    Orientation.addOrientationListener(this._orientationDidChange);
    const orientation = Orientation.getInitialOrientation();
    this._orientationDidChange(orientation);
  };

  _orientationDidChange = orientation => {
    let {setPlayerState} = this.props;
    this.setState({
      orientation,
    });
    if (orientation === 'LANDSCAPE-LEFT') {
      setPlayerState({orientation: 'LANDSCAPE-LEFT'});
    } else if (orientation === 'LANDSCAPE-RIGHT') {
      setPlayerState({orientation: 'LANDSCAPE-RIGHT'});
    } else if (orientation === 'LANDSCAPE') {
      setPlayerState({orientation: 'LANDSCAPE-LEFT'});
    } else {
      setPlayerState({orientation: 'PORTRAIT'});
    }
    this.initData();
  };

  changeOrientation = orientation => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  initData = () => {
    let {navigation, network, account, player} = this.props;
    let {file} = navigation.state.params;

    let {orientation, rate} = player;
    let pixelSize = helpers.filePixelSize(file);

    let maxRate = 'fhd';
    if (pixelSize[0] < 1280) {
      maxRate = 'ld';
    } else if (pixelSize[0] < 1920) {
      maxRate = 'hd';
    }
    rate = rate || account.settings.video.playRate[network.reach];
    if (maxRate === 'ld' && (rate === 'hd' || rate === 'fhd')) {
      rate = 'ld';
    } else if (maxRate === 'hd' && rate === 'fhd') {
      rate = 'hd';
    }

    let width = orientation === 'PORTRAIT' ? SCREEN_WIDTH : SCREEN_HEIGHT;
    let height = orientation === 'PORTRAIT' ? SCREEN_HEIGHT : SCREEN_WIDTH;

    let videoHeight = Math.round((width * pixelSize[1]) / pixelSize[0]);
    let videoWidth = width;

    let {width: opBarWidth, height: opBarHeight} = flattenStyle(styles.opBar);
    let opBarLeft = Math.round((width - opBarWidth) / 2);
    let opBarTop = Math.round((height - NAV_BAR_HEIGHT - opBarHeight) / 2);

    let videoSource = helpers.fileVideoSource(file, rate);

    this.rate = rate;
    this.maxRate = maxRate;
    this.width = width;
    this.height = height;
    this.opBarLeft = opBarLeft;
    this.opBarTop = opBarTop;
    this.videoHeight = videoHeight;
    this.videoWidth = videoWidth;
    this.videoSource = videoSource;

    this.setState({
      rate,
      maxRate,
      width,
      height,
      opBarLeft,
      opBarTop,
      videoHeight,
      videoWidth,
      videoSource,
    });
  };

  autoHideNavBar(seconds = 3000) {
    this.navBarHiddenTimeout && clearTimeout(this.navBarHiddenTimeout);
    this.navBarHiddenTimeout = setTimeout(() => {
      let {player, setPlayerState} = this.props;
      let {paused} = player;
      if (!paused) {
        setPlayerState({opBarHidden: true, rateSelectorVisible: false});
      }
    }, seconds);
  }

  getCurrentTimePercentage() {
    let {currentTime, duration} = this.props.player;
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    }
    return 0;
  }

  renderRateControl(nrate) {
    let {setPlayerState, player} = this.props;
    let {rate} = player;
    const isSelected = nrate === rate;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setPlayerState({rate: nrate});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {nrate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(nresizeMode) {
    let {setPlayerState, player} = this.props;
    let {resizeMode} = player;
    const isSelected = resizeMode === nresizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          setPlayerState({resizeMode: nresizeMode});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {nresizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  renderVolumeControl(nvolume) {
    let {setPlayerState, player} = this.props;
    let {volume} = player;
    const isSelected = nvolume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          setPlayerState({volume: nvolume});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {nvolume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }

  renderControl = () => {
    let {opBarHidden} = this.props.player;
    if (opBarHidden) {
      return null;
    }
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <View style={styles.rateControl}>
            {this.renderRateControl(0.25)}
            {this.renderRateControl(0.5)}
            {this.renderRateControl(1.0)}
            {this.renderRateControl(1.5)}
            {this.renderRateControl(2.0)}
          </View>

          <View style={styles.volumeControl}>
            {this.renderVolumeControl(0.5)}
            {this.renderVolumeControl(1)}
            {this.renderVolumeControl(1.5)}
          </View>

          <View style={styles.resizeModeControl}>
            {this.renderResizeModeControl('cover')}
            {this.renderResizeModeControl('contain')}
            {this.renderResizeModeControl('stretch')}
          </View>
        </View>

        <View style={styles.trackingControls}>
          <View style={styles.progress}>
            <View
              style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
            />
            <View
              style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
            />
          </View>
        </View>
      </View>
    );
  };

  renderRateView = () => {
    let {setPlayerState, player} = this.props;
    let {opBarHidden, rate, rateSelectorVisible} = player;

    if (opBarHidden || !rateSelectorVisible) {
      return null;
    }

    return (
      <View style={styles.rateSelector}>
        {Constant.VIDEO_RATES.filter(v => {
          if (v.value === rate) {
            return false;
          }
          if (
            this.maxRate === 'ld' &&
            (v.value === 'hd' || v.value === 'fhd')
          ) {
            return false;
          } else if (this.maxRate === 'hd' && v.value === 'fhd') {
            return false;
          }
          return true;
        }).map(({label, value}) => (
          <Text
            key={value}
            onPress={() => {
              this.autoHideNavBar();
              setPlayerState({
                rate: value,
                rateSelectorVisible: false,
                loaded: false,
                paused: false,
                ended: false,
              });
            }}
            style={styles.rateSelectorText}>
            {label}
          </Text>
        ))}
      </View>
    );
  };

  renderPlayControl = () => {
    let {setPlayerState, player} = this.props;
    let {isBuffering, opBarHidden, paused, ended} = player;
    let {opBarTop, opBarLeft} = this.state;

    if (isBuffering) {
      return (
        <View style={[styles.opBar, {top: opBarTop, left: opBarLeft}]}>
          <ActivityIndicator color={COLOR.textNormal} size="small" />
        </View>
      );
    }
    if (opBarHidden) {
      return null;
    }
    return (
      <View style={[styles.opBar, {top: opBarTop, left: opBarLeft}]}>
        <View style={styles.opContainer}>
          {ended ? (
            <Icon
              name="replay"
              onPress={() => {
                this.autoHideNavBar(300);
                this.player.seek(0);
                setPlayerState({ended: false, paused: false});
              }}
              style={styles.opText}
            />
          ) : (
            <Icon
              name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
              onPress={() => {
                this.autoHideNavBar(300);
                setPlayerState({paused: !paused});
              }}
              style={styles.opText}
            />
          )}
        </View>
      </View>
    );
  };

  renderBarControl = () => {
    let {setPlayerState, player} = this.props;
    let {
      opBarHidden,
      rateSelectorVisible,
      currentTime,
      orientation,
      duration,
      rate,
    } = player;

    if (opBarHidden) {
      return null;
    }

    return (
      <View style={styles.ctlBar}>
        <View>{this.renderControl()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.ctlBarText}>
              {helpers.durationText(currentTime)} /
              {helpers.durationText(duration)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={styles.ctlBarText}
              onPress={() => {
                this.autoHideNavBar(300);
                setPlayerState({
                  rateSelectorVisible: !rateSelectorVisible,
                });
              }}>
              {helpers.videoRateText(rate)}
            </Text>

            <Icon
              name={
                orientation === 'PORTRAIT' ? 'fullscreen' : 'fullscreen-exit'
              }
              onPress={() => {
                this.autoHideNavBar();
                if (orientation === 'PORTRAIT') {
                  this.changeOrientation('LANDSCAPE-LEFT');
                  setPlayerState({orientation: 'LANDSCAPE-LEFT'});
                } else {
                  this.changeOrientation('PORTRAIT');
                  setPlayerState({orientation: 'PORTRAIT'});
                }
              }}
              style={[styles.ctlBarText, {padding: 5, fontSize: 22}]}
            />
          </View>
        </View>
      </View>
    );
  };

  renderVideo = () => {
    let {setPlayerState, player} = this.props;
    let {
      opBarHidden,
      resizeMode,
      rate,
      repeat,
      currentTime,
      paused,
      muted,
      posterResizeMode,
      poster,
      volume,
    } = player;
    let {videoHeight, videoWidth, videoSource} = this.state;
    if (!videoSource) {
      return null;
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.autoHideNavBar();
          setPlayerState({opBarHidden: !opBarHidden});
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'blue',
          }}>
          <Video
            poster={poster}
            posterResizeMode={posterResizeMode}
            resizeMode={resizeMode}
            rate={rate}
            source={videoSource}
            repeat={repeat}
            paused={paused}
            muted={muted}
            volume={volume}
            onLoadStart={event => {
              let {src} = event;
              setPlayerState({src});
            }}
            onLoad={event => {
              let {duration, naturalSize} = event;
              setPlayerState({duration, naturalSize, loaded: true});
              this.player.seek(0);
            }}
            onProgress={event => {
              if (Math.round(currentTime) !== Math.round(event.currentTime)) {
                let {currentTime, playableDuration} = event;
                setPlayerState({currentTime, playableDuration});
              }
            }}
            onEnd={event => {
              setPlayerState({
                opBarHidden: false,
                paused: true,
                ended: true,
              });
            }}
            onBuffer={event => {
              let {isBuffering} = event;
              setPlayerState({isBuffering});
            }}
            onError={error => logger.warn(error)}
            onAudioBecomingNoisy={() => {
              this.setState({paused: true});
            }}
            onAudioFocusChanged={event => {
              this.setState({paused: !event.hasAudioFocus});
            }}
            ref={ref => {
              this.player = ref;
            }}
            style={[
              styles.video,
              {
                width: videoWidth,
                height: videoHeight,
              },
            ]}
          />

          {this.renderPlayControl()}
          {this.renderBarControl()}
          {this.renderRateView()}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    return (
      <Layout screenId={this.screenId}>
        <ActionSheet
          ref={ref => {
            this.actionSheet = ref;
          }}
        />
        {this.renderVideo()}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  video: {},
  opBar: {
    position: 'absolute',
    width: 300,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLOR.backgroundDarkLighter + '80',
  },
  opText: {
    color: COLOR.textLightNormal,
    opacity: 0.8,
    backgroundColor: 'transparent',
    fontSize: 48,
    margin: 5,
  },
  ctlBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    backgroundColor: COLOR.backgroundDarkLighter + '80',
  },
  ctlBarText: {
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 10,
  },
  rateSelector: {
    position: 'absolute',
    bottom: 42,
    right: Platform.OS === 'ios' ? 37 : 5,
    alignItems: 'flex-end',
  },
  rateSelectorText: {
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingTop: 10,
    // position: 'absolute',
    // bottom: 40,
    // left: 20,
    // right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

function mapStateToProps(state) {
  let {network, object, account, player} = state;
  return {
    network,
    object,
    account,
    player,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
