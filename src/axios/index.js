const jdpiqaInstance = ({ axios, config }) => axios.create(config.axiosInstances.jdpiqa)

export default {
  jdpiqaInstance
}