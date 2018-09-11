import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux'
import _ from 'lodash'
// import store from './src/store'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducers from './src/reducers'
import Shell from './src/components/Shell'
import Intro from './src/components/Intro'

global._ = _

const store = createStore(
  reducers
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            {/* <Scene
              key="intro"
              component={Intro}
              hideNavBar={true}
            /> */}
            <Scene key="shell" component={Shell} title="Interview Questions" renderLeftButton={null}/>
          </Stack>
        </Router>
      </Provider>
    )
  }
}
