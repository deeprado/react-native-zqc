import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLOR} from '../config';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : null,
      style: props.style ? props.style : null,
    };
  }
  render() {
    let {name, style} = this.state;
    return (
      <MaterialIcons {...this.props} name={name} style={[styles.icon, style]} />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
});
