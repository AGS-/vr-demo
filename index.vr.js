import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  View,
} from 'react-vr';

import Main from './components/main.vr';

export default class vr_intro extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Main />
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_intro', () => vr_intro);
