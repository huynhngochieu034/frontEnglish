import axios from 'axios';

const USER_API_BASE_URL = 'https://rocky-coast-50629.herokuapp.com/api/auth/';
const USER_API_BASE_URL2 = 'https://rocky-coast-50629.herokuapp.com/api/scores/';

class AuthService {

    pushScores(object){
        return axios.put(USER_API_BASE_URL2, object);
    }

    getAllScores(){
        return axios.get(USER_API_BASE_URL2);
    }

    getScores(){
        let username = this.getUserInfo().username;
        return axios.get(USER_API_BASE_URL2 + username);
    }

    refreshAPI(){
        return axios.get(USER_API_BASE_URL + "refresh");
    }

    handleLogin(credentials){
        return axios.post(USER_API_BASE_URL + "signin", credentials);
    }

    register(credentials){
        return axios.post(USER_API_BASE_URL + "signup", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
       return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return "Ok";
    }
}

export default new AuthService();