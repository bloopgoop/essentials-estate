import { createContext, useCallback, useEffect, useState } from "react";
import { Property } from "types/property";

interface PropertyForm {
  basicInformation: {
    username: string;
    password: string;
  };
  methodOfPayment: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
  loading: boolean;
  properties: Property[];
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export default PropertyFormContext;


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [basicInformation, setBasicInformation] = useState({
    username: "",
    password: "",
  });
  const [methodOfPayment, setMethodOfPayment] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);


  return (
    <PropertyFormContext.Provider value={contextData}>
      {loading ? null : children}
    </PropertyFormContext.Provider>
  );
}
