import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator } from 'react-native'
import { /* Header, */ SearchBar } from 'react-native-elements'
import QuestionList from './QuestionList'
import { connect } from 'react-redux'
import { AdMobBanner } from 'expo'
import actions from '../actions'
import config from '../config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  adMobBanner: { height: 60 },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionListContainer: { flex: 1 },
  filterBox: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 30,
    flex: 1
  }
})

class Shell extends React.Component {
 DAYS_TO_REFRESH_AFTER = 1
 
 constructor(props) {
  super(props)

  this.state = {
    isLoading: true,
    filterTerm: null
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

 onFilterInputChange = (filterTerm) => {
   this.setState({ ...this.state, filterTerm })
   this.props.filterByKeyword({ filterTerm })
 }

 onClearFilterInput = () => {
  this.setState({ ...this.state, filterTerm: null })
  this.props.filterByKeyword({ filterTerm: null })
 }

 renderFilterInput = () => (
    <SearchBar
      lightTheme
      onChangeText={ this.onFilterInputChange }
      value={ this.state.filterTerm }
      onClearText={ this.onClearFilterInput }
      icon={{ type: 'font-awesome', name: 'search' }}
      clearIcon
      placeholder='Search using keywords...' />
  )

  renderQuestionList = () => (
    <View
      style={ styles.questionListContainer }>
      <QuestionList questions={ this.props.questionList } />
    </View>
  )

 renderAdMobBanner = () => (
    <AdMobBanner
      style={ styles.adMobBanner }
      bannerSize="fullBanner"
      adUnitID={ config.admob.jdpiqa.ADUNITID }
      testDeviceID="EMULATOR"
      didFailToReceiveAdWithError={ this.bannerError }
    />
  )

 render() {
   if (this.state.isLoading) {
    return <View style={[ styles.container, styles.loading ]}>
      <ActivityIndicator size="large" />  
    </View>
   }
    
    return (
      <View style={styles.container}>
        { this.renderFilterInput() }
        { this.renderQuestionList() }
        { this.renderAdMobBanner() }
      </View>
    )
  }
}

const mapStateToProps = ({ QuestionListReducer }, ownProps) => {
  const { questionList, latestFetchDate } = QuestionListReducer

  return { questionList, latestFetchDate }
}

export default connect(mapStateToProps, { ...actions }) (Shell)
