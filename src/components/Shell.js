import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { Header } from 'react-native-elements'
import QuestionList from './QuestionList'

// import store from './src/store'
import { createStore, compose, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions'
import { isMoment } from 'moment';

class Shell extends React.Component {
 constructor(props) {
  super(props)

  // this.state = {
  //   questionList: null
  // }
 }

 getDataFromServer() {
  this.props.fetchQuestionsFromServer({
    callback: (err, results) => {
      if (err) {
        console.error('failed')
      } else {
        // this.setState({ ...this.state, questionList: results })
        this.props.setQuestionsInReduxStore({ questionList: results })
      }
    }
  })
 }

 componentDidMount() {
  // console.log(this.props.fetchQuestionsFromRedux())

  console.log(this.props.latestFetchDate, 'latestFetchDate')
  
  const daysPassedSinceLastFetch = moment(moment().format()).diff(this.props.latestFetchDate, 'days')

  console.log('daysPassedSinceLastFetch', daysPassedSinceLastFetch)

  if (daysPassedSinceLastFetch > 10) {
    this.props.setLastFetchDateInReduxStore({ latestFetchDate: moment().format() })
    this.getDataFromServer()
  }
 }

 render() {
    
    return (
      <View style={styles.container}>
        {/* <Header
        placement="left"
        centerComponent={{ text: this.state.heading }}
        /> */}
        <QuestionList data={this.props.questionList}/>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const mapStateToProps = ({ QuestionListReducer }) => {
  const { questionList, latestFetchDate } = QuestionListReducer

  return { questionList, latestFetchDate }
}

export default connect(mapStateToProps, { ...actions }) (Shell)
