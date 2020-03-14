import React, {Component} from 'react';
import {ScrollView} from 'react-native';

import Layout from '../../components/Layout';
import TextNotice from '../../components/TextNotice';
import Profile from './Profile';

export default class EditProfile extends Component {
  static navigationOptions = {
    title: '编辑资料',
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfile';
  }

  render() {
    let {navigation} = this.props;

    return (
      <Layout screenId={this.screenId}>
        <ScrollView>
          <TextNotice>完善的资料有助于结交到更多球友。</TextNotice>
          <Profile navigation={navigation} screenId={this.screenId} />
        </ScrollView>
      </Layout>
    );
  }
}
