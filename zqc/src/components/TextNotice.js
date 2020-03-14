import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';

export default class TextNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: props.onPress ? props.onPress : null,
      style: props.style ? props.style : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {onPress, style, containerStyle} = this.state;
    let child = <Text style={[styles.text, style]}>{this.props.children}</Text>;
    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, containerStyle]}>
          {child}
        </TouchableOpacity>
      );
    } else {
      return <View style={[styles.container, containerStyle]}>{child}</View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: COLOR.textNormal,
  },
});
