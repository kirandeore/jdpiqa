import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default class Intro extends React.Component {
 componentDidMount() {
    setTimeout(() => {
      Actions.shell({ onBack: () => console.log('....going back') })
    }, 2000)
 }

 render() {
    return (
      <View style={styles.container}>
        Java Interview Questions
      </View>
    )
  }
}


