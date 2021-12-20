import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
});

export default serverClient;
