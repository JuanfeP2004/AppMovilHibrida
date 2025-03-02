class Storage {
    static saveData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  
    static getData(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  
    static clearData(key) {
      localStorage.removeItem(key);
    }
  }
  
  export default Storage;
  