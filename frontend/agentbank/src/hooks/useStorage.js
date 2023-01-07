export default function useStorage() {
  const set = (key, value, persist) => {
    persist
      ? localStorage.setItem(key, value)
      : sessionStorage.setItem(key, value);
  };

  const get = (key, persist) => {
    return persist ? localStorage.getItem(key) : sessionStorage.getItem(key);
  };

  const remove = (key, persist) => {
    persist ? localStorage.remove(key) : sessionStorage.remove(key);
  };

  const clear = (persist) => {
    persist ? localStorage.clear() : sessionStorage.clear();
  };

  return { set, get, remove, clear };
}
