const getInitialState = (moment) => ({
        latestFetchDate: moment().format(),
        originalCopyOfQuestionList: null,
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
                .then(r => {
                    const { callback } = action.payload

                    if (callback) {
                        callback(null, r.data)
                    }
                })
                .catch(err => {
                    if (callback) {
                        callback(err, null)
                    }
                })
                
                return state
            }
            case 'SET_QUESTIONS_IN_REDUX_STORE': {
                const { questionList } = action.payload
                
                return {
                    ...state,
                    questionList,
                    originalCopyOfQuestionList: questionList
                }
            }
            case 'SET_LAST_FETCHED_DATE_IN_REDUX_STORE': {
                const { latestFetchDate } = action.payload

                return { ...state, latestFetchDate }
            }
            case 'FILTER_BY_KEYWORD': {
                const { filterTerm } = action.payload
                const { questionList, originalCopyOfQuestionList } = state
                console.log('filterTerm', filterTerm)
                
                if (filterTerm
                        && filterTerm.length >=3
                        && originalCopyOfQuestionList
                        && originalCopyOfQuestionList.length > 0) {
                    
                    const filteredQuestions = _.filter(originalCopyOfQuestionList, (item) => {
                        return item.answer.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1 || item.question.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
                        })
                        
                    return {
                        ...state,
                        questionList: filteredQuestions
                    }
                }

                return {
                    ...state,
                    questionList: originalCopyOfQuestionList,
                    originalCopyOfQuestionList
                }
            }
            default:
                return state
        }
}