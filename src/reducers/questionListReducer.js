import data from './../data'

const INITIAL_STATE = {
    // questionList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS_FROM_REDUX': {
            return { ...state,
                questionList: data
            }
        }
        case 'FETCH_QUESTIONS_FROM_SERVER': {
            new Promise((resolve, reject) => {
                resolve(data)
            })
            .then((results) => {
                const { callback } = action.payload

                if (callback) {
                    callback(null, results)
                }
            })
            
            return state
        }
        default:
            return state
    }
}