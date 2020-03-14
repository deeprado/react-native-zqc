import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';

import Icon from './Icon';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : null,
      icon: props.icon ? props.icon : null,
      style: props.style ? props.style : null,
      iconStyle: props.iconStyle ? props.iconStyle : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
      onPress: props.onPress ? props.onPress : null,
    };
  }
  render() {
    let {text, icon, style, iconStyle, containerStyle, onPress} = this.state;
    let leftChild = (
      <Icon name={icon} style={[styles.text, styles.icon, style, iconStyle]} />
    );
    let rightChild = <Text style={[styles.text, style]}>{text}</Text>;
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
  icon: {
    alignItems: 'center',
  },
});
