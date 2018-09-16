import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Card } from 'react-native-elements'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'expo'

const ADUNITID = `ca-app-pub-8338409911685300/7755658488`
const BANNER_ID = `ca-app-pub-8338409911685300/7755658488`
const INTERSTITIAL_ID = `ca-app-pub-8338409911685300~2976715345`
const REWARDED_ID = `ca-app-pub-8338409911685300~2976715345`

// AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
// AdMobInterstitial.setTestDeviceID("EMULATOR");
// AdMobRewarded.setAdUnitID(REWARDED_ID);
// AdMobRewarded.setTestDeviceID("EMULATOR");
// console.disableYellowBox = true;

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // const db = firebase.firestore()

        // db.collection('questionandanswers')
        //     .doc()
        //     .set({
        //         question: 'aaasd',
        //         answer: 'sdfadfsdaf'
        //     })

        

        // .then(response => console.log(response.val()))

        // fetch('https://us-central1-jdpiqa.cloudfunctions.net/getJdpiqaData')
        // .then(response => console.log(response))
    }

    render() {
        return (
          <View>
              <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={ADUNITID}
                testDeviceID="EMULATOR"
                didFailToReceiveAdWithError={this.bannerError}
            />

            <FlatList
                data={this.props.data}
                keyExtractor={item => item.question}
                renderItem={({item, index}) => 
                    <Card title={`Q${index+1}: ${item.question}` }
                        containerStyle={{
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: '#ddd',
                            borderBottomWidth: 0,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 3,
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 10,
                            marginBottom: 15 }}
                            titleStyle={[{ textAlign: 'left'}, global.material.subhead ]}
                        >
                        <Text style={[{ lineHeight: 25,
                            fontSize: 20,
                            textAlign: 'left',
                            fontFamily: 'calibri'
                            }, global.material.thin ]}>{ item.answer }</Text>
                    </Card>
                }
                />
            </View>
        )
    }
}