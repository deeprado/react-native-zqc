import React from 'react';
import {StyleSheet, TextInput, Platform} from 'react-native';
import {flattenStyle} from '../utils';

import {COLOR} from '../config';

export default class CusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onRef: props.onRef ? props.onRef : null,
      style: props.style ? props.style : null,
    };
  }
  render() {
    let {onRef, style} = this.state;
    let {fontSize} = flattenStyle(style || styles.input);
    return (
      <TextInput
        placeholderTextColor={COLOR.textPrompt}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        {...this.props}
        ref={onRef}
        style={[
          styles.input,
          Platform.select({ios: {height: fontSize * 2}}),
          style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    fontSize: 14,
    color: COLOR.textEmpha,
  },
});
