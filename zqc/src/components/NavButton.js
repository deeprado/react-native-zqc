import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {COLOR} from '../config';

export default class NavButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: props.style ? props.style : null,
    };
  }
  render() {
    let {style} = this.state;
    return (
      <Text {...this.props} style={[styles.text, style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
    padding: 5,
  },
});
