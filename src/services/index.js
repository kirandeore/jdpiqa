const qNaService = ({ axiosInstanceCollection }) => ({
    fetchQuestionNanswers() {
      return axiosInstanceCollection.jdpiqa.get('/getJdpiqaData/')  
    }
})

export default {
    qNaService
}