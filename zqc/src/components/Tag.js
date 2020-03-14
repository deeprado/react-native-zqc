import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : null,
      selected: props.selected ? props.selected : false,
      disabled: props.disabled ? props.disabled : false,
      onPress: props.onPress ? props.onPress : null,
      textStyle: props.textStyle ? props.textStyle : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {
      text,
      selected,
      disabled,
      onPress,
      containerStyle,
      textStyle,
    } = this.state;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          selected ? styles.containerSelected : null,
          containerStyle,
        ]}>
        <Text
          style={[
            styles.text,
            disabled ? styles.textDisabled : null,
            selected ? styles.textSelected : null,
            textStyle,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: COLOR.backgroundLighter,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  containerSelected: {
    backgroundColor: COLOR.theme,
  },
  text: {
    color: COLOR.textNormal,
    fontSize: 12,
  },
  textDisabled: {
    color: COLOR.textPrompt,
  },
  textSelected: {
    color: COLOR.textLightNormal,
  },
});
