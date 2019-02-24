import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import { Text, Button } from "react-native-elements";
import { Permissions, Notifications } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';


export class Walkthrough3 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token:null,
      skip:null
    }
    this.getToken = this.getToken.bind(this);
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
      token: token,
      skip: true
    })
    if (this.skip){
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
}
 
  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
      <Text h4 style={styles.textTitle}>Get Notification</Text>
      <RkText style={styles.text}>See deals on lock</RkText>
      <RkText style={styles.text}>screen</RkText>
      <Button buttonStyle={styles.button} onPress={this.getToken} title="ALLOW NOTIFICATION" />
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
