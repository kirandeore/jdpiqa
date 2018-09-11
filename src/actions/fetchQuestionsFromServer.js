export default fetchQuestionsFromServer = ({ callback }) => {
    return {
        payload: { callback },
        type: 'FETCH_QUESTIONS_FROM_SERVER'
    }
}