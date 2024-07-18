export const useLocalStorage = (key: string) => {
  const setItem = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      
    } catch (error) {
      console.error(error);
    }
  };
  const getItem = () => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    } catch (error) {
      console.error(error);
      return ;
    }
  }
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
  return {setItem, getItem,removeItem}

}