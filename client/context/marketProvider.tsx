import { useState } from 'react' 
import  { MarketContext, MarketContextType } from './index'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MarketProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MarketContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};