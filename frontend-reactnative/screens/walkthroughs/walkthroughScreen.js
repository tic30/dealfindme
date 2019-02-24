import React from 'react';
<<<<<<< Updated upstream
import { View, Button } from 'react-native';
||||||| merged common ancestors
import { View } from 'react-native';
import { Button } from 'react-native-elements';
=======
import { View } from 'react-native';
>>>>>>> Stashed changes
import { RkStyleSheet } from 'react-native-ui-kitten';
import {
  PaginationIndicator,
} from '../../components/';
import { Walkthrough } from '../../components/walkthrough';
import { Walkthrough1 } from './walkthrough1';
import { Walkthrough2 } from './walkthrough2';
<<<<<<< Updated upstream
import { StackActions, NavigationActions } from 'react-navigation';
||||||| merged common ancestors
import { Walkthrough3 } from './walkthrough3';

import { StackActions, NavigationActions } from 'react-navigation';
=======
import { Walkthrough3 } from './walkthrough3';

>>>>>>> Stashed changes
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

  // onStartButtonPressed = () => {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'Home' })],
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // };

  render = () => (
    <View style={styles.screen}>
      <Walkthrough onChanged={this.onWalkThroughIndexChanged}>
        <Walkthrough1 />
        <Walkthrough2 />
      </Walkthrough>
<<<<<<< Updated upstream
      <PaginationIndicator length={2} current={this.state.index} />
      <Button
        style={styles.button}
        title="GET STARTED"
        onPress={this.onStartButtonPressed}
      />
||||||| merged common ancestors
      <PaginationIndicator length={2} current={this.state.index} />
      <Button
        buttonStyle={styles.button}
        title="GET STARTED"
        onPress={this.onStartButtonPressed}
      />
=======
      <PaginationIndicator length={3} current={this.state.index} />
>>>>>>> Stashed changes
    </View>
  )
}

const styles = RkStyleSheet.create({
  screen: {
    paddingVertical: 28,
    alignItems: 'center',
    flex: 1,
  },
<<<<<<< Updated upstream
  button: {
    marginTop: 25,
    marginHorizontal: 16,
  },
||||||| merged common ancestors
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    padding: 10,
    width:260,
    backgroundColor: "#DC4545"
  },
=======
  
>>>>>>> Stashed changes
})
