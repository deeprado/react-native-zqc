import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {flattenStyle} from '../utils';

import {COLOR} from '../config';

export default class ButtonWithBg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : null,
      disable: props.disable ? props.disable : false,
      onPress: props.onPress ? props.onPress : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
      textStyle: props.textStyle ? props.textStyle : null,
    };
  }
  render() {
    let {text, disable, onPress, containerStyle, textStyle} = this.state;
    let {fontSize} = flattenStyle(textStyle || styles.text);
    containerStyle = [
      styles.container,
      disable ? styles.containerDisable : null,
      {padding: Math.round(fontSize / 2)},
      containerStyle,
    ];
    let children = (
      <Text
        style={[styles.text, disable ? styles.textDisable : null, textStyle]}>
        {text}
      </Text>
    );
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
          {children}
        </TouchableOpacity>
      );
    } else {
      return <View style={containerStyle}>{children}</View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.theme,
    borderRadius: 5,
  },
  containerDisable: {
    backgroundColor: COLOR.backgroundDarker,
  },
  text: {
    color: COLOR.textLightNormal,
    fontSize: 14,
  },
  textDisable: {
    color: COLOR.textPrompt,
  },
});
