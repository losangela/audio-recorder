import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'http://54.183.26.52:3000/',
  timeout: 10000,
});

export default serverClient;
