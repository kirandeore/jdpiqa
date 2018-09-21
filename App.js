import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux'
import _ from 'lodash'
import axios from 'axios'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'
import { Font, AppLoading, SplashScreen } from 'expo'
// import { REHYDRATE } from 'redux-persist/constants'
// import store from './src/store'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { combineReducers, compose } from 'redux';
import reducersCreator from './src/reducers'
import Shell from './src/components/Shell'
import { material } from 'react-native-typography'
import constants from './src/utils/constants'
import config from './src/config'
import axiosInstanceCreator from './src/axios'
import serviceCreator from './src/services'

const axiosInstanceCollection = _.mapValues(axiosInstanceCreator, value => value({ axios, config }))

const serviceCollection = _.mapValues(serviceCreator, value => value({ axiosInstanceCollection }))

const reducersCollection = _.mapValues(reducersCreator, value => value({ serviceCollection }))

global._ = _
global.material = material
global.constants = constants
global.config = config

const combinedReducer = combineReducers(reducersCollection)

const persistConfig = {
  key: 'root',
  storage, // defaults to localStorage for web and AsyncStorage for react-native
  whiteList: ['QuestionListReducer']
}

// const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = createStore(
  combinedReducer // persistedReducer
)

// let persistor = persistStore(store)  // persistor.purge()/ flush()/ pause()/ persist()

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

  componentWillMount() {
    
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
