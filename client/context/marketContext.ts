import { createContext } from "react";

export type MarketContextType = {
  isLoading: boolean;
};

export const contextDefaultValues: MarketContextType = {
  isLoading: false,
};

export const MarketContext =
  createContext<MarketContextType>(contextDefaultValues);
