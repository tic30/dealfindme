import React from 'react';
import ImageSlider from 'react-native-image-slider';
import {
  ScrollView,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';

//import NavigationType from '../config/navigation/propTypes';


export class PreviewScreen extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Preview'.toUpperCase(),
  };

  
  render = () => (
    <ScrollView style={styles.root}>
      <ImageSlider 
        style={styles.imageContainer}
        images={[
        'https://static.zara.net/photos///2018/I/0/1/p/8566/257/701/2/w/1920/8566257701_2_3_1.jpg?ts=1538738906060',
        'https://static.zara.net/photos///2018/I/0/1/p/8566/257/701/2/w/1920/8566257701_2_4_1.jpg?ts=1538738917653'
        ]}/>
        <Image
         style={styles.detail}
        resizeMode={'contain'} 
        source={require('../assets/images/detail_1.png')}
        />
        <Image
         style={styles.detail}
        resizeMode={'contain'} 
        source={require('../assets/images/detail_2.png')}
        />
        <Image
         style={styles.detail}
        resizeMode={'contain'} 
        source={require('../assets/images/detail_3.png')}
        />
    </ScrollView>
  )
}

const win = Dimensions.get('window');
const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
  imageContainer:{
    height: 450,
    marginBottom: 0,
  },
  detail:{
    width: win.width,
    height: 400,
    marginTop: 0,
  }
}));
