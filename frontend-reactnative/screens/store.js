import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Image
} from 'react-native';
import {
    RkCard,
    RkText,
    RkStyleSheet
} from 'react-native-ui-kitten';
import Placeholder from 'rn-placeholder';


export class Store extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            dealList: []
        }
    }
    static navigationOptions = {
        title: 'DealFindMe',
        /* No more header config here! */
    }
    componentDidMount(){
        fetch("http://10.3.18.209:3000/shops/-122.4045094/37.7841393", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //alert("Author name at 0th index:  " + responseJson[0].name);
            this.setState({
              dealList: responseJson
            })
        });
    
    }
    render() {
        const {navigation} = this.props
        const { dealList } = this.state
        const deal = navigation.getParam('deal');
        return (
            <View style={styles.root}>
                <View style={styles.topHalf}>
                    <Text style={{color:'white', fontSize:24}}>{deal.name}</Text>
                </View>
                <View style={styles.botHalf}>
                    <ScrollView>
                        <Image style={{width:'95%',resizeMode : 'contain'}} source={require('../assets/images/store.png')} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: '#f5f5f5',
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    title: {
        marginBottom: 5,
    },
    imageContainer: {
        height: 400
    },
    topHalf:{
        backgroundColor: '#AE0015',
        height:200,
        width:'100%',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    botHalf:{
        backgroundColor: 'white',
        flex:1,
        width:'100%',
        marginTop:-40,
        borderRadius:8,
        padding:20
    }
}));
