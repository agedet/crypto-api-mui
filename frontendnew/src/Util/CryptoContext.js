import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("NGN");
  const [symbol, setSymbol] = useState("N");

  useEffect(() => { 
    if (currency === "USD") {
      setSymbol("$");
    } 
    else if (currency === "") {
      setSymbol("");
    } 
  }, [currency]);
    
  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}