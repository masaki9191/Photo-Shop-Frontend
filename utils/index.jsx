// ローカルストレージからデータを読み込む
export const loadJSON = key => {
    return key && JSON.parse(localStorage.getItem(key));
  };
  
// ローカルストレージにデータを書き込む
export const saveJSON = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};