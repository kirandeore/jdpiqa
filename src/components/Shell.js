import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
// import { Header } from 'react-native-elements'
import QuestionList from './QuestionList'
import { connect } from 'react-redux'
import { AdMobBanner } from 'expo'
import actions from '../actions'

const ADUNITID = `ca-app-pub-8338409911685300/7755658488`

class Shell extends React.Component {
 DAYS_TO_REFRESH_AFTER = 1
 
 constructor(props) {
  super(props)

  this.state = {
    isLoading: true
  }
 }

 getDataFromServer() {
  this.props.fetchQuestionsFromServer({
    callback: (err, results) => {
      if (err) {
        console.error('failed')
      } else {
        this.setState({ ...this.state, isLoading: false })
        this.props.setQuestionsInReduxStore({ questionList: results })
      }
    }
  })
 }

 componentDidMount() {
  // console.log(this.props.fetchQuestionsFromRedux())
  const daysPassedSinceLastFetch = moment(moment().format()).diff(this.props.latestFetchDate, 'days')

  if (daysPassedSinceLastFetch > this.DAYS_TO_REFRESH_AFTER || this.props.questionList === null) {
    this.props.setLastFetchDateInReduxStore({ latestFetchDate: moment().format() })
    this.getDataFromServer()
  } else {
    this.setState({ ...this.state, isLoading: false })
  }
 }

 render() {
   if (this.state.isLoading) {
    return <View style={[styles.container,
      { alignItems: 'center', justifyContent: 'center' }]}>
      <ActivityIndicator size="large" />  
    </View>
   }
    
    return (
      <View style={styles.container}>
        {/* <Header
        placement="left"
        centerComponent={{ text: this.state.heading }}
        /> */}
        <Text>Placeholder for filter</Text>
        <View
          style={{ flex: 1 }}>
          <QuestionList data={this.props.questionList} />
        </View>
        <AdMobBanner
            style={{ height: 60 }}
            bannerSize="fullBanner"
            adUnitID={ADUNITID}
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
});

const mapStateToProps = ({ QuestionListReducer }) => {
  const { questionList, latestFetchDate } = QuestionListReducer

  return { questionList, latestFetchDate }
}

export default connect(mapStateToProps, { ...actions }) (Shell)
