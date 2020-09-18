const axios = require('axios')

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let errorLogKey = 'EXP_LOG'

function loginOrRegister (params) {	

    try {

        return axios.post(paramObject.API_ENDPOINT, params.payload, params.header)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })

    } catch(e) {
        console.error (errorLogKey)
    }

}

module.exports.loginOrRegister = loginOrRegister;
