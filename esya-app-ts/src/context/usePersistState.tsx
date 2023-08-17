import React, { useEffect, useState } from 'react'

const usePersistState = (storageKey: any, initialState: any) => {
  const [state, setInternalState] = useState(initialState);
  var store = require("store");

  useEffect(() => {
    const storageInBrowser = store.get(storageKey);

    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, []);

  const setState = (newState: any) => {
    store.set(storageKey, newState);
    setInternalState(newState);
  }

  return [state, setState];
}

export default usePersistState;