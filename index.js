const axios = require('axios')

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let errorLogKey = 'EXP_LOG'

function handlePostRequest (params) {	
    try {

        const axiosRequestSession = (params.method === 'put')
        ? axios.put(params.API_ENDPOINT, params.payload, params.header) 
        : axios.post(params.API_ENDPOINT, params.payload, params.header)
         
         return axiosRequestSession.then(response => {
                return response
            }).catch(error => {
                return error
            })

    } catch(e) {
        console.error (errorLogKey + ': ' + e.message)
        return e;
    }

}

// Login e criação de conta
function loginOrRegister(params) {
    return handlePostRequest(params);
}

// Envio de reset de password
function sendPasswordResetLink  (params) {
    return handlePostRequest(params);
}

// Envio de email de confirmação
function sendConfirmationEmail  (params) {
    return handlePostRequest(params);
}

function syncUserData  (params) {
    params.method = 'put'
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
module.exports.sendConfirmationEmail    = sendConfirmationEmail;
module.exports.syncUserData             = syncUserData;
