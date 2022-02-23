import { useState } from 'react';
import { loadJSON, saveJSON } from '../utils';

export default function useLoginUser() {
  const getUser = () => {
    let user = [];
    if (typeof window !== 'undefined') {
      user = loadJSON('user') == null ? [] : loadJSON('user');
    }
    return user;
  };

  const [loginUser, setLoginUser] = useState(getUser());

  const saveUser = user => {
    saveJSON('user',user)
    setLoginUser(user);
  };

  return {
    loginUser,
    setLoginUser: saveUser,
  }
}