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
import { Text } from "react-native-elements";

export class Walkthrough1 extends React.Component {
  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/1_red.png') : require('../../assets/images/1_red.png')
  );

  renderImage = () => (
    <Image
      style={{width: 300, height: 300}}
      source={this.getThemeImageSource(RkTheme.current)}
    />
  );

  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
      <Text h4 style={styles.textTitle}>Let's Get Started</Text>
      <RkText style={styles.text}>Deals on hand when{"\n"}you are walking in a store</RkText>
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
    color: "#AE0015",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  text:{
    color: "#666666",
    marginBottom: 103
  }
}));
