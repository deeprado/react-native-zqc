import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR} from '../config';
import Icon from './Icon';

class Processing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: props.processing ? props.processing : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }

  render() {
    if (this.state.processing && this.state.processing.task) {
      return (
        <View style={[styles.container, this.state.containerStyle]}>
          <Animatable.Text
            animation="rotate"
            iterationCount="infinite"
            easing="linear">
            <Icon name="rotate-right" style={styles.text} />
          </Animatable.Text>
          <Text style={styles.text}>{this.state.processing.task}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundNotice,
  },
  text: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
});

function mapStateToProps(state) {
  let {processing} = state;
  return {
    processing,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Processing);
