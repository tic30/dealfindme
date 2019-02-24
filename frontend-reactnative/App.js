import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { WalkthroughScreen } from './screens/walkthroughs';
import { Notifications } from 'expo';
import { PreviewScreen, HomeScreen, Store } from './screens';

class DetailsScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go to preview"
          onPress={() => this.props.navigation.navigate('Preview')}
        />
      </View>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
        <Icon
          name='search'
          type='material'
          color='white'
        />
        <Text style={{color:'white'}}>DealFindMe</Text>
        <Icon
          name='favorite-border'
          type='material'
          color='white'
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Walkthrough: WalkthroughScreen,
    Store: Store,
    Preview: PreviewScreen
  },
  {
    initialRouteName: 'Walkthrough',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#AE0015',
        borderBottomWidth: 0,
        shadowOpacity: 0
      },
      headerTitle:<LogoTitle/>,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.handleNotification = this.handleNotification.bind(this)
  // }
  componentWillMount(){
    Notifications.addListener(this.handleNotification)
  }
  handleNotification(notification){
    // this.setState({
    //   notification:notification
    // })
    let shopInfo = notification.data
    alert(shopInfo["name"] + " have a deal " + shopInfo["discountInfo"] + " for you!")
    // this.props.navigation.navigate('Store', {deal:shopInfo})
  }
  render(){
    return <AppContainer/>
  }
}