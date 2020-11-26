import { createContext, useState, useContext } from 'react'

const mContext = createContext(null)

export const MyProvider = ({ children }) => {
  const [payload, setPayload] = useState({
    filter_key: {},
    search_key: '',
    sort_key: {}
  });
  return (
    <mContext.Provider
      value={{ payload, setPayload }}
    >
      {children}
    </mContext.Provider>
  );
};

export const useSearch = () => useContext(mContext);
