import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Header, Icon} from 'react-native-elements';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';

import Processing from './Processing';
import ErrorInput from './ErrorInput';
import Loading from './Loading';
import ErrorFlash from './ErrorFlash';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: props.showHeader ? props.showHeader : false,
      screenId: props.screenId ? props.screenId : null,
      containerStyle: props.containerStyle ? props.containerStyle : null,
    };
    this.layout = {
      x: 0,
      y: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderHeader = () => {
    return null;
    // return (
    //   <Header
    //     backgroundColor={'#fff'}
    //     leftComponent={this.renderLeftComponent()}
    //     centerComponent={{
    //       text: '帮助中心',
    //       style: {color: '#222', fontSize: 24},
    //     }}
    //   />
    // );
  };

  render() {
    let {screenId, containerStyle} = this.state;
    return (
      <ActionSheetProvider>
        <View
          onLayout={event => {
            this.layout = event.nativeEvent.layout;
          }}
          style={[styles.container, containerStyle]}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLOR.backgroundNormal}
          />
          <Processing />
          <ErrorInput screenId={screenId} />
          {this.props.children}
          <Loading layout={this.layout} />
          <ErrorFlash />
        </View>
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
  },
});
