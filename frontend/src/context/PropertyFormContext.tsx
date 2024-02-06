import { createContext, useCallback, useState } from "react";
import { Property } from "types/property";

type PropertyForm = {
  basicInformation: {
    first_name: string;
    last_name: string;
    dob: string;
    email: string;
    phone: string;
  };
  loading: boolean;
  properties: Property[];
}

const defaultPropertyForm: PropertyForm = {
  basicInformation: {
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
  },
  loading: true,
  properties: [],
}

type PropertyFormState = {
  propertyForm: PropertyForm
  setPropertyForm: (propertyForm: PropertyForm) => void
}

const initialState: PropertyFormState = {
  propertyForm: defaultPropertyForm,
  setPropertyForm: () => null,
}

type PropertyFormProps = {
  children: React.ReactNode
  defaultPropertyForm?: PropertyForm
  storageKey?: string
}

const PropertyFormContext = createContext<PropertyFormState>(initialState)


export function PropertyFormProvider({ children, storageKey="propertyForm", ...props }: PropertyFormProps) {
  const [basicInformation, setBasicInformation] = useState<PropertyForm["basicInformation"]>(defaultPropertyForm.basicInformation)
  const [properties, setProperties] = useState<Property[]>(defaultPropertyForm.properties)
  const [loading, setLoading] = useState(false)

  const submitForm = useCallback((propertyForm: PropertyForm) => {
    // Submit form to server
  }, [])


  const contextData = {
    propertyForm: {
      basicInformation,
      properties,
      loading,
      submitForm,
    },
    setPropertyForm: (propertyForm: PropertyForm) => {
      setBasicInformation(propertyForm.basicInformation)
      setProperties(propertyForm.properties)
      setLoading(propertyForm.loading)
    }
  }


  return (
    <PropertyFormContext.Provider value={contextData}>
      {loading ? null : children}
    </PropertyFormContext.Provider>
  );
}
