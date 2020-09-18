const axios = require('axios')

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function loginOrRegister (params) {	

    return axios.post(paramObject.API_ENDPOINT, params.payload, params.header)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })

}

module.exports.loginOrRegister = loginOrRegister;
