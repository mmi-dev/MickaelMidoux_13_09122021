/**
 * storage manegement
 */
export default function useStorage() {
  /**
   * save parameter in local or session storage
   * @param {string} key stored parameter key
   * @param {string} value stored parameter value
   * @param {boolean} persist authentication persistence
   */
  const set = (key, value, persist) => {
    persist
      ? localStorage.setItem(key, value)
      : sessionStorage.setItem(key, value);
  };

  /**
   * get parameter from local or session storage
   * @param {string} key stored parameter key
   * @param {boolean} persist authentication persistence
   * @return parameter
   */
  const get = (key, persist) => {
    return persist ? localStorage.getItem(key) : sessionStorage.getItem(key);
  };

  /**
   * delete parameter from local or session storage
   * @param {string} key stored parameter key
   * @param {boolean} persist authentication persistence
   */
  const remove = (key, persist) => {
    persist ? localStorage.remove(key) : sessionStorage.remove(key);
  };

  /**
   * clear local or session storage
   * @param {boolean} persist authentication persistence
   */
  const clear = (persist) => {
    persist ? localStorage.clear() : sessionStorage.clear();
  };

  return { set, get, remove, clear };
}
