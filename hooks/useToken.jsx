import { useState } from 'react';
import { loadJSON, saveJSON } from '../utils';

export default function useToken() {
  const getToken = () => {
    let token = "";
    if (typeof window !== 'undefined') {
      token = loadJSON('token') == null ? [] : loadJSON('token');
    }
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = token => {
    saveJSON('token',token)
    setToken(token);
  };

  return {
    token,
    setToken: saveToken,
  }
}