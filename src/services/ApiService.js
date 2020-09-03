import axios from 'axios';

const baseURL = 'https://wellington-empresas.herokuapp.com/'; // https://wellington-empresas.herokuapp.com/';
const api = axios.create({ baseURL });

export default api;
