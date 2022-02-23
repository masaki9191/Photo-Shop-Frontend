import { useState } from 'react';
import { loadJSON, saveJSON } from '../utils';

export default function useIsLogined() {
  const getIsLogined = () => {
    let isLogined = false;
    if (typeof window !== 'undefined') {
      isLogined = loadJSON('isLogined') == null ? false : loadJSON('isLogined');
    }
    return isLogined;
  };

  const [isLogined, setIsLogined] = useState(getIsLogined());

  const saveIslogined = isLogined => {
    saveJSON('isLogined',isLogined)
    setIsLogined(isLogined);
  };

  return {
    isLogined,
    setIsLogined: saveIslogined,
  }
}