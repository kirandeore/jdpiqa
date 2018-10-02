import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux'
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PersistGate } from 'redux-persist/integration/react'
import { Font, AppLoading, SplashScreen } from 'expo'
// import store from './src/store'
import { View, ActivityIndicator } from 'react-native'
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

// console.log(__DEV__, process.env.NODE_ENV)

const axiosInstanceCollection = _.mapValues(axiosInstanceCreator, value => value({ axios, config }))

const serviceCollection = _.mapValues(serviceCreator, value => value({ axiosInstanceCollection }))

const reducersCollection = _.mapValues(reducersCreator, value => value({ serviceCollection, moment }))

global._ = _
global.material = material
global.constants = constants
global.config = config
global.moment = moment

const combinedReducer = combineReducers(reducersCollection)

const persistConfig = {
  key: 'root', // if you change is this then a new storage is created with different key, use for upgrade
  storage, // defaults to localStorage for web and AsyncStorage for react-native
  // whiteList: ['QuestionListReducer']
}

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = createStore(
  persistedReducer, composeWithDevTools()
)

let persistor = persistStore(store)  // persistor.purge()/ flush()/ pause()/ persist()

// uncomment this line to purge all data
// persistor.purge()

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

  renderLoading = () => {
    <View>
      <ActivityIndicator size="large" />
    </View>
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
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
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
        </PersistGate>
      </Provider>
    )
  }
}
