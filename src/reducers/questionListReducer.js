
const getInitialState = (moment) => ({
        latestFetchDate: moment().format(),
        questionList: null
    })

export default ({ serviceCollection, moment }) => 
    (state = getInitialState(moment), action) => {
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
            case 'SET_LAST_FETCHED_DATE_IN_REDUX_STORE': {
                const { latestFetchDate } = action.payload

                return { ...state, latestFetchDate }
            }
            default:
                return state
        }
}