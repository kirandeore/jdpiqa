import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux'
import _ from 'lodash'
import { Font } from 'expo'
// import store from './src/store'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducers from './src/reducers'
import Shell from './src/components/Shell'
import Intro from './src/components/Intro'
import { material } from 'react-native-typography'
import { Asset, AppLoading, SplashScreen } from 'expo';
import constants from './src/utils/constants'

global._ = _
global.material = material
global.constants = constants

const store = createStore(
  reducers
)

export default class App extends React.Component {
  state = {
    resourcesLoaded: false
  }

  async init() {
    // init is returning a promise
    await Font.loadAsync({
      'calibri': require('./assets/fonts/calibri.ttf'),
      'comic': require('./assets/fonts/comic.ttf')
    })
  }

  render() {
    if (!this.state.resourcesLoaded) {
      return (
        <AppLoading
          startAsync={this.init}
          onFinish={() => {
            this.setState({...this.state, resourcesLoaded: true})
            SplashScreen.hide()
          }}
          onError={() => console.log('Error loading resources')}
          autoHideSplash={false}
        />
      );
    }

    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            {/* <Scene
              key="intro"
              component={Intro}
              hideNavBar={true}
            /> */}
            <Scene key="shell"
              component={Shell}
              title="Java Interview Questions"
              navigationBarStyle={{
                backgroundColor: 'teal',
              }}
              titleStyle= {[global.material.headlineWhite ]}
              renderLeftButton={null} />
          </Stack>
        </Router>
      </Provider>
    )
  }
}
