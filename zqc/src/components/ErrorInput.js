import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {COLOR} from '../config';

class ErrorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenId: props.screenId ? props.screenId : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }

  render() {
    let {containerStyle, screenId} = this.state;
    let {error} = this.props;
    let inputErrors = error.input[screenId] || {};
    if (Object.values(inputErrors).every(v => v.length === 0)) {
      return null;
    }
    return (
      <Animatable.View
        animation="fadeIn"
        style={[styles.container, containerStyle]}>
        {Object.entries(inputErrors)
          .filter(([k, v]) => v.length > 0)
          .map(([k, v]) => {
            return (
              <Text key={k} style={styles.text}>
                {v.join('')}
              </Text>
            );
          })}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: COLOR.backgroundNotice,
  },
  text: {
    marginVertical: 5,
    fontSize: 12,
    // paddingVertical: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorInput);
