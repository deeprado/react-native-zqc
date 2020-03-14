import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {flattenStyle} from '../utils';

import {COLOR} from '../config';
import * as helpers from '../helpers';
import Icon from './Icon';
import Text from './Text';

export default class CusImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playIconVisible: props.playIconVisible ? props.playIconVisible : null,
      duration: props.duration ? props.duration : null,
      onPress: props.onPress ? props.onPress : null,
      style: props.style ? props.style : null,
      playIconStyle: props.playIconStyle ? props.playIconStyle : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {
      playIconVisible,
      duration,
      onPress,
      containerStyle,
      style,
      playIconStyle,
    } = this.state;
    let child = <Image style={style} {...this.props} />;
    if (onPress) {
      let {width, height} = flattenStyle(style);
      let {fontSize} = flattenStyle([styles.playIcon, playIconStyle]);
      let left = Math.floor((width - fontSize) / 2);
      let top = Math.floor((height - fontSize) / 2);
      return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
          {child}

          {playIconVisible ? (
            <Icon
              name="play-circle-outline"
              style={[styles.playIcon, playIconStyle, {top, left}]}
            />
          ) : null}

          {duration ? (
            <Text style={styles.durationText}>
              {helpers.durationText(duration)}
            </Text>
          ) : null}
        </TouchableOpacity>
      );
    } else {
      return <View style={containerStyle}>{child}</View>;
    }
  }
}

const styles = StyleSheet.create({
  playIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: COLOR.textLightNormal,
    opacity: 0.8,
    backgroundColor: 'transparent',
    fontSize: 36,
  },
  durationText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 5,
  },
});
