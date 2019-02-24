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


export class HomeScreen extends React.Component {
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
        fetch("http://10.0.0.186:3000/shops/-122.4045094/37.7841393", {
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
        const { dealList } = this.state
        return (
            <View style={styles.root}>
                <View style={styles.topHalf}>
                    <Text style={{color:'white', fontSize:24}}>Go ahead and Walk around</Text>
                    {/* <Button
                        title="Go to Details"
                        onPress={() => {
                            this.props.navigation.navigate('Details', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                            });
                        }}
                    /> */}
                </View>
                <View style={styles.botHalf}>
                    <ScrollView>
                        { dealList ? dealList.map((deal) => {
                        return (<RkCard rkType='article'>
                            <View rkCardHeader>
                                <View>
                                    <RkText style={styles.title} rkType='header4'>{deal.name}</RkText>
                                </View>
                            </View>
                            <TouchableOpacity>
                                    <Image style={{height: 50,resizeMode : 'contain' }} source={{uri: 'http://10.0.0.186:3000' + deal.logo }} />
                            </TouchableOpacity>
                            <View rkCardContent>
                                <View>
                                    <RkText rkType='primary3 bigLine'>{deal.discountInfo}</RkText>
                                </View>
                                <View>
                                    <RkText rkType='primary3 bigLine'>{deal.distance}</RkText>
                                </View>
                            </View>
                            <View rkCardFooter>
                            </View>
                        </RkCard>)
                    })
                        : 
                    (
                        <Placeholder.ImageContent
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>Placeholder has finished :D</Text>
                        </Placeholder.ImageContent>)}
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
        width:'90%',
        marginTop:-40,
        borderRadius:8,
        padding:20
    }
}));
