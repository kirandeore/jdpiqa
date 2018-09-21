export default {
    fetchQuestionsFromRedux: () => ({
        payload: null,
        type: 'FETCH_QUESTIONS_FROM_REDUX'
    }),
    fetchQuestionsFromServer: ({ callback }) => ({
        payload: { callback },
        type: 'FETCH_QUESTIONS_FROM_SERVER'
    }),
    setQuestionsInReduxStore: ({ questionList }) => ({
        payload: { questionList },
        type: 'SET_QUESTIONS_IN_REDUX_STORE'
    })
}