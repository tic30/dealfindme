import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
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
    };
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
                        {/* {dealList ? dealList.map((deal) => {
                        return (<RkCard rkType='article'>
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
                        </RkCard>)
                    })
                        : (<Placeholder.ImageContent
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>Placeholder has finished :D</Text>
                        </Placeholder.ImageContent>)} */}
                        <Placeholder.ImageContent
                            size={60}
                            animate="fade"
                            lineNumber={4}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                        >
                            <Text>Placeholder has finished :D</Text>
                        </Placeholder.ImageContent>
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
        backgroundColor: 'red',
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
