import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {

    }
  },
  methods () {
    var instance = axios.create({
      baseURL: 'http://localhost:7777',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    instance.post('/api/AccountApi/Login', qs.stringify(loginParams))
  }
}
