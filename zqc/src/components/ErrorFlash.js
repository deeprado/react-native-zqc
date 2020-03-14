import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {COLOR} from '../config';

class ErrorFlash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error ? props.error : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }
  render() {
    let {error, containerStyle} = this.state;
    if (!error || !error.flath) {
      return null;
    }
    let errorFlath = error.flash;

    return (
      <Animatable.View
        animation="fadeIn"
        style={[styles.container, containerStyle]}>
        <Text style={styles.error}>{errorFlath}</Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLOR.backgroundNotice,
  },
  error: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
});

function mapStateToProps(state) {
  let {error} = state;
  return {
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorFlash);
