import API from './api';
import Auth from '../utils/auth';

export const login = async (data) => {
    return API.post('/sessions', data)
        .then(response => {
            if (response.status !== 200 || !response.data.token){
                throw new Error("Invalid result")
            }
            // Store 
            localStorage.setItem('userName', response.data.user.name)
            localStorage.setItem('userEmail', response.data.user.email)
            Auth.logIn(response.data.token)
            return { success: true };
        })
        .catch(error => {
            console.log('Error login', error);
            return { code: 'error', message: 'Login failed!' };
        });
};

