import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { usePropertyFormContext } from "pages/PropertyForm/PropertyForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Progress } from "components/ui/progress";


const propertySchema = z.object({
  address: z.string().min(1, {
    message: "Please enter an address.",
  }),
  city: z.string().min(1, {
    message: "Please enter a city.",
  }),
  state: z.string().min(1, {
    message: "Please enter a state.",
  }),
  zip: z.string().min(1, {
    message: "Please enter a zip code.",
  }),
  title: z.string().min(1, {
    message: "Please enter a title.",
  }),
  rent: z.coerce.number().min(0, {
    message: "Please enter a rent amount.",
  }),
  description: z.string(),
  bedrooms: z.coerce.number().min(0, {
    message: "Please enter a number of bedrooms.",
  }),
  bathrooms: z.coerce.number().min(0, {
    message: "Please enter a number of bathrooms.",
  }),
  garage: z.coerce.number().min(0, {
    message: "Please enter a number of garages.",
  }),
  sqft: z.coerce.number().min(0, {
    message: "Please enter a square footage.",
  }),
  lotsize: z.coerce.number().min(0, {
    message: "Please enter a lot size.",
  }),
  type: z.string(),
});

const AddProperty = () => {
  const { propertyForm, setPropertyForm } = usePropertyFormContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
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
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof propertySchema>) {
    // save the form data to the context
    setPropertyForm({
      ...propertyForm,
      propertyInfo: values,
    });
    console.log(propertyForm);
    navigate("/property-form/confirm-info");
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10 m-auto text-center mt-10">Property Information</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 flex-1 bg-accent p-10 rounded m-auto"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Zip" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Rent</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Rent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Bedrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Bathrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="garage"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Garage</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Garage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sqft"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Sqft</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Sqft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lotsize"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Lotsize</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Lotsize" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-5">
            <Button className="float-right" type="submit">
              Save and continue
            </Button>
          </div>
        </form>
      </Form>

      <Progress value={99} className="w-1/2 m-auto mt-10" />

    </div>
  );
};

export default AddProperty;
