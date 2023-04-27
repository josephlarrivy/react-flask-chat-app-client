
const useLocalStorage = () => {

  const localStoreUsername = (username) => {
    localStorage.setItem('username', username)
  }

  const localRemoveUsername = () => {
    localStorage.removeItem('username')
  }

  const localRetrieveUsername = () => {
    const username = localStorage.getItem('username')
    return username
  }

  return [localStoreUsername, localRemoveUsername, localRetrieveUsername];
};

export default useLocalStorage;