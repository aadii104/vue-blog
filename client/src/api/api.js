import axios from 'axios';
import {
    Notification
} from 'element-ui';

import store from './../store';
import router from './../router/index';

const ERROR_MSG = 'Something happened. Please try again.';

function handleError(error, message) {
    if (error)
        if (error.response.status === 403) {
            Notification.warning({
                title: 'Authentication Error',
                message: 'You need to login to continue...'
            });

            store.commit('removeUser');
            router.push({
                path: '/'
            });
            return;
        }

    Notification.error({
        title: 'Error Occurred',
        message: message
    });
}

function displayMessage(message) {
    Notification.info({
        title: 'Info',
        message: message
    });
}


function loginUser(userData) {
    return axios.post(`${store.getters.getBaseURL}/auth/login`, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function addUser(userData) {
    return axios.post(`${store.getters.getBaseURL}/auth/register`, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

export {
    handleError,
    displayMessage,
    loginUser,
    registerUser
};