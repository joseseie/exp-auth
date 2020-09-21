const axios = require('axios')

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let errorLogKey = 'EXP_LOG'

function handlePostRequest (params) {	

    try {

        return axios.post(params.API_ENDPOINT, params.payload, params.header)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })

    } catch(e) {
        console.error (errorLogKey + ': ' + e.message)
        return e;
    }

}

function loginOrRegister(params) {
    return handlePostRequest(params);
}

function sendPasswordResetLink  (params) {
    return handlePostRequest(params);
}

function composeUserToken (params) {	

    try {

        let responseData = params.data;
        let token = responseData.token_type + ' ' + responseData.access_token;

        return token;

    } catch(e) {
        console.error (errorLogKey + ': ' + e.message);
        return null;
    }

}

function composeHeader (token, contentType = 'application/x-www-form-urlencoded') {
    return {
        headers: {
            'Authorization': token,
            'Content-Type': contentType,
        }
    };
}

function getUserInfoByToken (params) {

    if(!(params && params.token)) {
        console.error (errorLogKey + ': Dados do user não buscados, pois o \'Token\' não foi enviado como parametro');
        return; // interrompe a execução
    }

    return handlePostRequest({
        API_ENDPOINT: params.API_ENDPOINT,
        header: composeHeader(params.token),
        payload: {},
    })
    .then (resp => {
        return resp.data
    })
    .catch (error => {
        return error
    })
}

module.exports.loginOrRegister          = loginOrRegister;
module.exports.composeUserToken         = composeUserToken;
module.exports.getUserInfoByToken       = getUserInfoByToken;
module.exports.sendPasswordResetLink    = sendPasswordResetLink;
