import axios from 'axios';
import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken, getRefreshToken, setAccessToken } from './getLocalData';

/**
 * axios instane is create with given base url and headers type
 */
const instance = axios.create({
  baseURL: URL_TO_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * interceptors setup for that instance before sending any request
 */
instance.interceptors.request.use(
  async (config) => {
    if (config.headers) config.headers['Authorization'] = 'Bearer ' + await getAccessToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * interceptors setup for axios instance after getting any response
 */
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      //got error response
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === 'invalid access token'
      ) {
        // Access Token was expired

        originalConfig._retry = true;
        try {
          const rs = await instance.post('/token', {
            refreshToken: getRefreshToken(),
          });
          const { accessToken } = rs.data;
           setAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
