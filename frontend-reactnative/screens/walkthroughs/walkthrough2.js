import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';

import { 
  Location, Permissions
} from 'expo';

import { Text } from "react-native-elements";


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
      {/* <Text h4 style={styles.textTitle}>Allow Location</Text> */}
      {/* <Button style={styles.textTitle} onPress={this.getLocation} color="#AE0015" title="Allow Location" /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={this.getLocation}
      >
        <Text style={styles.textTitle}>Allow Location</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Let us know when</Text>
      <Text style={styles.text2}>you step into a store</Text>
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
    // marginTop: 60,
    // marginHorizontal: 16,
    // padding: 10,
    // width:260,
    // backgroundColor: "#DC4545"
  },
  textTitle: {
    // textAlign: 'center',
    backgroundColor: "white",
    color: "#AE0015",
    marginTop: 10,
    marginBottom: 20,
    // marginHorizontal: 30,
    fontSize: 28,
    textDecorationLine: 'underline'
  },
  text:{
    color: "#666666",
  },
  text2:{
    color: "#666666",
    marginBottom: 100,
  },
}));
