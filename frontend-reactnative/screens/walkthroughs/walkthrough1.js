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

export class Walkthrough1 extends React.Component {
  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/kittenImage.png') : require('../../assets/images/kittenImageDark.png')
  );

  renderImage = () => (
    <Image source={this.getThemeImageSource(RkTheme.current)} />
  );

  render = () => (
    <View style={styles.screen}>
      {this.renderImage()}
<<<<<<< Updated upstream
      <RkText rkType='header2' style={styles.text}>Welcome to Kitten Tricks</RkText>
||||||| merged common ancestors
      <Text h4 style={styles.textTitle}>Let's Get Started</Text>
      <RkText style={styles.text}>Deals on hand when</RkText>
      <RkText style={styles.text}>you walk in a store</RkText>
=======
      <Text h4 style={styles.textTitle}>Let's Get Started</Text>
      <RkText style={styles.text}>Deals on hand when{"\n"}you are walking in a store</RkText>
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
  text: {
    marginTop: 20,
  },
<<<<<<< Updated upstream
||||||| merged common ancestors
  text:{
    color: "#666666",
  }
=======
  text:{
    color: "#666666",
    marginBottom: 110
  }
>>>>>>> Stashed changes
}));
