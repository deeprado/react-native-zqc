import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {flattenStyle} from '../utils';

import {COLOR} from '../config';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading ? props.loading : null,
      layout: props.layout ? props.layout : null,
      iconColor: props.iconColor ? props.iconColor : COLOR.textNormal,
      iconSize: props.iconSize ? props.iconSize : 'small',
      textStyle: props.textStyle ? props.textStyle : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
  }

  render() {
    let {
      loadingCount,
      layout,
      prompt,
      enabled,
      iconColor,
      iconSize,
      textStyle,
      containerStyle,
    } = this.state;
    prompt = prompt !== undefined ? prompt : '';
    if (!enabled || loadingCount <= 0) {
      return null;
    }

    let {width, height} = flattenStyle([styles.container, containerStyle]);
    let left = Math.floor((layout.width - width) / 2);
    let top = Math.floor((layout.height - height) / 2);
    return (
      <View style={[styles.container, containerStyle, {left, top}]}>
        <ActivityIndicator color={iconColor} size={iconSize} />
        {prompt ? <Text style={[styles.text, textStyle]}>{prompt}</Text> : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 10,
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
});

function mapStateToProps(state) {
  let {loading} = state;
  return {
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
