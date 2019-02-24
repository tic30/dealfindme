import React from 'react';
import {
  View,
  Image,
  Text,
  Button
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

import { 
  Location, Permissions
} from 'expo';


export class Walkthrough2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      location: null
    }
    this.getLocation = this.getLocation.bind(this)
  }
  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/2_red.png') : require('../../assets/images/2_red.png')
  );

  renderImage = () => (
    <Image
      style={{width: 300, height: 300}}
      source={this.getThemeImageSource(RkTheme.current)}
    />
  );

  async getLocation() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    this.setState({ 
      location: location
    });
  };


  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
      <RkText rkType='header2' style={styles.text}>Allow Location</RkText>
      <Button onPress={this.getLocation} title="Allow Location" />
      {this.state.location && <Text>{this.state.location}</Text>}
    </View>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
}));
