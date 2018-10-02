const qNaService = ({ axiosInstanceCollection }) => ({
    fetchQuestionNanswers() {
      return axiosInstanceCollection.jdpiqaInstance.get('/getJdpiqaData')  
    }
})

export default {
    qNaService
}