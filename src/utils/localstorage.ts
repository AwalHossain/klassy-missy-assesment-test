export const setToLocalStorage = (key:string, value:any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  }
};

export const getFromLocalStorage = (key:string, defaultValue = null) => {
  if (typeof window !== "undefined") {
    try {
      const storedValue = localStorage.getItem(key);
      if (
        storedValue === null ||
        storedValue === undefined ||
        storedValue === "" ||
        storedValue === "undefined"
      ) {
        return defaultValue;
      }
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const removeFromLocalStorage = (key:string) => {
  localStorage.removeItem(key);
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  }
};
