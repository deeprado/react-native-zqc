import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class ActionSheet extends Component {
  static contextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };
  constructor(props) {
    super(props);
  }

  showActionSheetWithOptions(options, onPress) {
    return this.context.showActionSheetWithOptions(options, onPress);
  }

  render() {
    let {children, onPress, onLongPress, delayLongPress = 0} = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress(this.context.showActionSheetWithOptions)}
        onLongPress={() => onLongPress(this.context.showActionSheetWithOptions)}
        delayLongPress={delayLongPress}>
        {children}
      </TouchableOpacity>
    );
  }
}
