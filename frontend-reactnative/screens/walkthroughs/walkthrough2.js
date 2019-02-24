import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

import { 
  Location, Permissions
} from 'expo';

import { Text, Button } from "react-native-elements";


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
      <Text h4 style={styles.textTitle}>Allow Location</Text>
      <Text style={styles.text}>Let us know when</Text>
      <Text style={styles.text}>you step into a store</Text>
      <Button buttonStyle={styles.button} onPress={this.getLocation} title="ALLOW LOCATION" />
      {this.state.location && <Text>{this.state.location.coords.longitude+', '+this.state.location.coords.altitude}</Text>}
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
  button: {
    marginTop: 60,
    marginHorizontal: 16,
    padding: 10,
    width:260,
    backgroundColor: "#DC4545"
  },
  textTitle: {
    textAlign: 'center',
    color: "#DC4545",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  text:{
    color: "#666666",
  },
}));
