import React from 'react';
import ImageSlider from 'react-native-image-slider';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkGalleryImage
} from 'react-native-ui-kitten';

import {
  Avatar,
} from '../components';
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
      <RkCard rkType='article'>
      <ImageSlider 
        style={styles.imageContainer}
        images={[
        'https://static.massimodutti.net/3/photos/2019/V/0/1/p/6405/933/594/6405933594_1_1_16.jpg?t=1550666104805&impolicy=massimodutti-itxmediumhigh&imwidth=900',
        'https://static.massimodutti.net/3/photos/2019/V/0/1/p/6405/933/594/6405933594_2_2_16.jpg?t=1550666104805&impolicy=massimodutti-itxmediumhigh&imwidth=900'
        ]}/>
        <View rkCardHeader>
          <View>
            <RkText style={styles.title} rkType='header4'>From Cat.Inc</RkText>
          </View>
          <TouchableOpacity>
            <Avatar rkType='circle' img={require('../assets/images/logo.png')} />
          </TouchableOpacity>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='primary3 bigLine'>A tentative version of preview section for the products, please work or I will shoot you :)</RkText>
          </View>
        </View>
        <View rkCardFooter>
        </View>
      </RkCard>
    </ScrollView>
  )
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
  imageContainer:{
    height: 400
  }
}));
