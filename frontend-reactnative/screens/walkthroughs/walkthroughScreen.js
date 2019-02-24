import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { RkStyleSheet } from 'react-native-ui-kitten';
import {
  GradientButton,
  PaginationIndicator,
} from '../../components/';
import { Walkthrough } from '../../components/walkthrough';
import { Walkthrough1 } from './walkthrough1';
import { Walkthrough2 } from './walkthrough2';
import { Walkthrough3 } from './walkthrough3';

import { StackActions, NavigationActions } from 'react-navigation';
// import NavigationType from '../../config/navigation/propTypes';

export class WalkthroughScreen extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    header: null,
  };

  state = {
    index: 0,
  };

  onWalkThroughIndexChanged = (index) => {
    this.setState({ index });
  };

  onStartButtonPressed = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render = () => (
    <View style={styles.screen}>
      <Walkthrough onChanged={this.onWalkThroughIndexChanged}>
        <Walkthrough1 />
        <Walkthrough2 />
        <Walkthrough3 />
      </Walkthrough>
      <PaginationIndicator length={2} current={this.state.index} />
      <Button
        buttonStyle={styles.button}
        title="GET STARTED"
        onPress={this.onStartButtonPressed}
      />
    </View>
  )
}

const styles = RkStyleSheet.create({
  screen: {
    paddingVertical: 28,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    padding: 10,
    width:260,
    backgroundColor: "#DC4545"
  },
})
