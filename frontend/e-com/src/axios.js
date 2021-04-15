import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/e-com-909cc/us-central1/api'

});

export default instance;

