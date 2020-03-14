import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {flattenStyle} from '../utils';

import {COLOR} from '../config';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : null,
      onPress: props.onPress ? props.onPress : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
      textStyle: props.textStyle ? props.textStyle : null,
    };
  }

  render() {
    let {text, onPress, containerStyle, textStyle} = this.state;
    let {fontSize} = flattenStyle(textStyle || styles.text);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {padding: Math.round(fontSize / 2)},
          containerStyle,
        ]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.theme,
    borderRadius: 5,
  },
  text: {
    color: COLOR.theme,
    fontSize: 14,
  },
});
