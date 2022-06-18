import axios from 'axios';
import { keys } from '../presentation/util';

export const apiAdapter = axios.create({
  baseURL: keys.GRAPHQL_REQUEST_URL,
  method: 'post',
});
