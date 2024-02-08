import Navbar from "components/Navbar/Navbar";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

type PropertyFormType = {
  basicInformation: {
    first_name: string;
    last_name: string;
    dob: string;
    email: string;
    phone: string;
  };
  propertyInfo: {
    address: string;
    city: string;
    state: string;
    zip: string;
    title: string;
    rent: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    garage: number;
    sqft: number;
    lotsize: number;
    type: string;
  };
};

const defaultPropertyForm: PropertyFormType = {
  basicInformation: {
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
  },
  propertyInfo: {
    address: "",
    city: "",
    state: "",
    zip: "",
    title: "",
    rent: 0,
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    sqft: 0,
    lotsize: 0,
    type: "",
  },
};

type PropertyFormContextType = {
  propertyForm: PropertyFormType;
  setPropertyForm: (form: PropertyFormType) => void;
};

export default function PropertyForm() {
  const [propertyForm, setPropertyForm] =
    useState<PropertyFormType>(defaultPropertyForm);

  const propertyFormContext = {
    propertyForm,
    setPropertyForm,
  };

  return (
    <>
    <div className="mb-20">
        
      <Navbar />
      <Outlet context={propertyFormContext}></Outlet>
      </div>

    </>
  );
}

export function usePropertyFormContext() {
  return useOutletContext<PropertyFormContextType>();
}
