import data from './../data'

const INITIAL_STATE = {
    questionList: null
}

export default ({ serviceCollection }) => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS_FROM_REDUX': {
            return state
        }
        case 'FETCH_QUESTIONS_FROM_SERVER': {
            console.info('Getting data from server...')
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
        case 'SET_QUESTIONS_IN_REDUX_STORE': {
            const { questionList } = action.payload
            
            return {...state, questionList }
        }
        default:
            return state
    }
}