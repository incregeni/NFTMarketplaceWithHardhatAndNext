import { createContext } from "react";
import { MarketContextType } from "../@types";

export const contextDefaultValues: MarketContextType = {
  isLoading: false,
};

export const MarketContext =
  createContext<MarketContextType>(contextDefaultValues);
