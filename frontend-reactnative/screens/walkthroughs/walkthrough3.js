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
import { Permissions, Notifications } from 'expo';

export class Walkthrough3 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token:null
    }
    this.getToken = this.getToken.bind(this)
  }
  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/3_red.png') : require('../../assets/images/3_red.png')
  );

  renderImage = () => (
    <Image source={this.getThemeImageSource(RkTheme.current)} 
    style={{width: 300, height: 300}}/>
  );

  async getToken(){
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({
      token: token
    })
  }
 
  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
      <RkText rkType='header2' style={styles.text}>Get Notification</RkText>
      <RkText>See deals on lock</RkText>
      <Button onPress={this.getToken} title="Allow Notification" />
      {this.state.token && <Text>{this.state.token}</Text>}
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
