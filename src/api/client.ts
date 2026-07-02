import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const API_URL = 'http://103.166.103.110/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// We need a way to trigger global logout from the interceptor.
// We can use a simple event emitter or just allow registering a callback.
let unauthorizedCallback: (() => void) | null = null;

export const setUnauthorizedCallback = (callback: () => void) => {
  unauthorizedCallback = callback;
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }
    } catch (error) {
      console.warn('Could not retrieve token from keychain', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const authHeader = error.config?.headers?.Authorization || '';
      if (!authHeader.includes('guest_token') && unauthorizedCallback) {
        unauthorizedCallback();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
