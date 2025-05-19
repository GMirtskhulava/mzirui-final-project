import { createContext, useState, useContext } from 'react';

export const LoaderContext = createContext({});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const loadingDelay = 500;

  // fetch
  const useDataLoader = async (fetchReq) => {
    setLoading(true);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, loadingDelay));
    const dataPromise = fetchReq();

    const [data] = await Promise.all([dataPromise, delayPromise]);

    setLoading(false);

    return data ? data.json() : undefined;
  };

  // no fetch
  const useFakeLoader = () => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, loadingDelay);
  };

  return (
    <LoaderContext.Provider value={{ loading, useDataLoader, useFakeLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};