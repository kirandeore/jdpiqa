let config

if (__DEV__) {
    config = require('./config.dev').default
} else {
    config = require('./config.prod').default
}

export default config