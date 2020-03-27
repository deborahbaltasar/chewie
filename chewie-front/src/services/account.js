import API from './api';
import Auth from '../utils/auth';

export const login = async (data) => {
    return API.post('/sessions', data)
        .then(response => {
            console.log("DATA", response, !response.data.token);
            if (response.status!==200 || !response.data.token){
                throw new Error("Invalid result")
            }
            // Store 
            Auth.logIn(response.data.token)
            return { success: true };
        })
        .catch(error => {
            console.log('Error login', error);
            return { code: 'error', message: 'Login failed!' };
        });
};

