import React, {Component} from 'react';
import {Dimensions, View, ActivityIndicator} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Gallery from 'react-native-image-gallery';
// import ImageViewer from 'react-native-image-zoom-viewer';

import * as helpers from '../../helpers';
import * as actions from '../../redux/actions/index';

import Layout from '../../components/Layout';
import ActionSheet from '../../components/ActionSheet';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

class Album extends Component {
  static navigationOptions = {
    title: '相册',
  };

  constructor(props) {
    super(props);
    this.screenId = props.screenId || 'Album';
    // this.state = {
    //   animating: true,
    //   curentImage: 0,
    // };
    this.renderLoad = this.renderLoad.bind(this);
  }

  componentDidMount() {
    let {navigation, setScreenState} = this.props;
    let {files, currentIndex} = navigation.state.params;
    setScreenState(this.screenId, {files, currentIndex});
  }

  componentWillUnmount() {
    let {resetScreenState} = this.props;
    resetScreenState(this.screenId);
  }

  // renderLoad() {
  //   return (
  //     <View style={{marginTop: screenHeight / 2 - 20}}>
  //       <ActivityIndicator animating={this.state.animating} size={'large'} />
  //     </View>
  //   );
  // }

  render() {
    let {screen} = this.props;
    let {files} = screen[this.screenId];
    let images = files.map(v => {
      let uri = helpers.fileImageSource(v, 'huge').uri;
      if (uri.startsWith('http')) {
        return {
          source: {
            uri: uri,
          },
          dimensions: {width: 150, height: 150},
        };
      } else {
        // return {
        //   source: require(uri),
        //   dimensions: {width: 150, height: 150},
        // };
      }
    });
    // let imageUrls = files.map(v => {
    //   let url = helpers.fileImageSource(v, 'huge').uri;
    //   if (url.startsWith('http')) {
    //     return {
    //       url,
    //     };
    //   }
    // });
    return (
      <Layout
        screenId={this.screenId}
        containerStyle={{backgroundColor: 'black'}}>
        <ActionSheet
          ref={ref => {
            this.actionSheet = ref;
          }}
        />
        <Gallery images={images} pageMargin={5} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  let {screen} = state;
  return {
    screen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
