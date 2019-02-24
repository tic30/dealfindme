import React from 'react';
import {
  View,
  Image,
<<<<<<< Updated upstream
  Dimensions,
||||||| merged common ancestors
  Text,
  Button
=======
>>>>>>> Stashed changes
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
<<<<<<< Updated upstream
import { sendNotification } from '../../components/sendNotification'
||||||| merged common ancestors

import { 
  Location, Permissions
} from 'expo';

=======

import { Text, Button } from "react-native-elements";

import { 
  Location, Permissions
} from 'expo';

>>>>>>> Stashed changes

export class Walkthrough2 extends React.Component {
  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/screensImage.png') : require('../../assets/images/screensImageDark.png')
  );

  renderImage = () => (
    <Image
      style={{ width: Dimensions.get('window').width }}
      source={this.getThemeImageSource(RkTheme.current)}
    />
  );

  render = () => (
    <View style={styles.screen}>
    <sendNotification/>
      {this.renderImage()}
<<<<<<< Updated upstream
      <RkText rkType='header2' style={styles.text}>Explore different examples of frequently used pages</RkText>
||||||| merged common ancestors
      <RkText rkType='header2' style={styles.text}>Allow Location</RkText>
      <Button onPress={this.getLocation} title="Allow Location" />
      {this.state.location && <Text>{this.state.location.coords.longitude+', '+this.state.location.coords.altitude}</Text>}
=======
      <Text h4 style={styles.textTitle}>Allow Location</Text>
      <RkText style={styles.text}>Let us know when you</RkText>
      <RkText style={styles.text}>step into a store</RkText>
      <Button buttonStyle={styles.button} onPress={this.getLocation} title="ALLOW LOCATION" />
>>>>>>> Stashed changes
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
  button: {
    marginTop: 60,
    marginHorizontal: 16,
    padding: 10,
    width:260,
    backgroundColor: "#DC4545"
  },
}));
