import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLOR} from '../config';
import Icon from './Icon';

export default class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon ? props.icon : null,
      iconStyle: props.iconStyle ? props.iconStyle : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {containerStyle, iconStyle, icon} = this.state;
    return (
      <View style={[styles.container, containerStyle]}>
        {icon ? <Icon name={icon} style={[styles.icon, iconStyle]} /> : null}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLOR.linePrompt,
  },
  icon: {
    width: 30,
    fontSize: 16,
    textAlign: 'center',
    color: COLOR.textEmpha,
  },
});
