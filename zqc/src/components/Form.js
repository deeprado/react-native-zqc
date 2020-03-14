import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLOR} from '../config';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {containerStyle} = this.state;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: COLOR.backgroundLighter,
    borderWidth: 1,
    borderColor: COLOR.lineNormal,
    borderRadius: 5,
  },
});
