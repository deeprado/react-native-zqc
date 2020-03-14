import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLOR} from '../config';

import Text from './Text';

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.containerStyle : null,
      moreText: props.moreText ? props.moreText : null,
      moreOnPress: props.moreOnPress ? props.moreOnPress : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {title, moreText, moreOnPress, containerStyle} = this.state;
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {moreText ? (
          <Text onPress={moreOnPress} style={styles.titleText}>
            {moreText}
          </Text>
        ) : null}
      </View>
      {this.props.children}
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 12,
    color: COLOR.textNormal,
  },
});
