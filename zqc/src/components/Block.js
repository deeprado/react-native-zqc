import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: props.onPress ? props.onPress : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }

  render() {
    let {onPress, containerStyle} = this.state;
    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, containerStyle]}>
          {this.props.children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.container, containerStyle]}>
          {this.props.children}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLOR.backgroundLighter,
  },
});
