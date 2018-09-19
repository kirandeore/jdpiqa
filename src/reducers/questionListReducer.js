import data from './../data'

const INITIAL_STATE = {
    // questionList: []
}

export default ({ serviceCollection }) => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS_FROM_REDUX': {
            return { ...state,
                questionList: data
            }
        }
        case 'FETCH_QUESTIONS_FROM_SERVER': {
            serviceCollection.qNaService.fetchQuestionNanswers()
            .then((r) => {
                const { callback } = action.payload

                if (callback) {
                    callback(null, r.data)
                }
            })
            .catch((err) => {
                if (callback) {
                    callback(err, null)
                }
            })
            
            return state
        }
        default:
            return state
    }
}