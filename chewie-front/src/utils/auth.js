import moment from 'moment';

const TOKEN = 'AUTH_TOKEN';

const Auth = {
  getToken() {
    try {
      const token = JSON.parse(localStorage.getItem(TOKEN));
      // TODO: need to add validTO in backend....
      //const now = moment();
      //if (now.isAfter(moment(token.validTo))) return '';
      console.log("token", token);
      return token;
    } catch {
      return '';
    }
  },
  isLoggedIn() {
    return Auth.getToken().length > 0;
  },
  logOut() {
    return localStorage.removeItem(TOKEN);
  },
  logIn(token) {
    return localStorage.setItem(TOKEN, JSON.stringify(token));
  }
};

export const validationPassword = password => {
  let letterCount = 0;
  let numberCount = 0;

  if (password.length < 8) return false;

  for (let i = 0; i < password.length; i += 1) {
    if (/^[A-Za-z]+$/.test(password[i])) letterCount = +1;
    if (/^[0-9]+$/.test(password[i])) numberCount = +1;
  }
  if (letterCount > 0 && numberCount > 0) return true;
  return false;
};

export default Auth;
