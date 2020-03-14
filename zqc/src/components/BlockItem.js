import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';
import Icon from './Icon';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftIcon: props.leftIcon ? props.leftIcon : null,
      leftText: props.leftText ? props.leftText : null,
      rightImage: props.rightImage ? props.rightImage : null,
      rightText: props.rightText ? props.rightText : null,
      rightComponent: props.rightComponent ? props.rightComponent : null,
      rightIcon: props.rightIcon ? props.rightIcon : null,
      onPress: props.onPress ? props.onPress : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
      imageStyle: props.imageStyle ? props.imageStyle : null,
      leftIconStyle: props.leftIconStyle ? props.leftIconStyle : null,
      rightIconStyle: props.rightIconStyle ? props.rightIconStyle : null,
    };
  }

  render() {
    let {
      leftIcon,
      leftText,
      rightImage,
      rightText,
      rightComponent,
      rightIcon,
      onPress,
      containerStyle,
      imageStyle,
      leftIconStyle,
      rightIconStyle,
    } = this.state;
    let leftChild = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon ? (
          <Icon
            name={leftIcon}
            style={[styles.leftText, styles.leftIcon, leftIconStyle]}
          />
        ) : null}
        <Text style={styles.leftText}>{leftText}</Text>
      </View>
    );
    let rightChild = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {rightImage ? (
          <Image
            source={rightImage}
            style={[{width: 50, height: 50}, imageStyle]}
          />
        ) : null}
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
        {rightComponent || null}
        {rightIcon ? (
          <Icon
            name={rightIcon}
            style={[styles.rightText, styles.rightIcon, rightIconStyle]}
          />
        ) : null}
      </View>
    );
    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, containerStyle]}>
          {leftChild}
          {rightChild}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.container, containerStyle]}>
          {leftChild}
          {rightChild}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLOR.linePrompt,
    borderTopWidth: 1,
  },
  leftIcon: {
    marginRight: 5,
    fontSize: 16,
    color: COLOR.textNormal,
  },
  leftText: {
    fontSize: 14,
    color: COLOR.textEmpha,
  },
  rightText: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
  rightIcon: {
    marginLeft: 5,
    fontSize: 16,
    color: COLOR.textNormal,
  },
});
