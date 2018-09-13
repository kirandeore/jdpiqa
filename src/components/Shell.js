import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { Header } from 'react-native-elements'
import QuestionList from './QuestionList'

// import store from './src/store'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import actions from '../actions';

class Shell extends React.Component {
 constructor(props) {
  super(props)

  this.state = {
    questionList: null
  }
 }

 getDataFromServer() {
  this.props.fetchQuestionsFromServer({
    callback: (err, results) => {
      if (err) {
        console.error('failed')
      } else {
        this.setState({ ...this.state, questionList: results })
      }
    }
  })
 }

 componentDidMount() {
  this.getDataFromServer()
 }

 render() {
    
    return (
      <View style={styles.container}>
        {/* <Header
        placement="left"
        centerComponent={{ text: this.state.heading }}
        /> */}
        <QuestionList data={this.state.questionList}/>
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

export default connect(null, actions) (Shell)
