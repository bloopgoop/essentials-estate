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
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Progress } from "components/ui/progress"


const basicInformationSchema = z.object({
  first_name: z
    .string()
    .max(150, {
      message: "First name must be less than 150 characters.",
    })
    .min(1, {
      message: "Please enter a first name.",
    }),
  last_name: z
    .string()
    .max(150, {
      message: "Last name must be less than 150 characters.",
    })
    .min(1, {
      message: "Please enter a last name.",
    }),
  dob: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().max(10, {
    message: "Please enter a valid phone number.",
  }),
});

export default function BasicInfo() {
  const { propertyForm, setPropertyForm } = usePropertyFormContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dob: "",
      email: "",
      phone: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof basicInformationSchema>) {
    // save the form data to the context
    setPropertyForm({
      ...propertyForm,
      basicInformation: values,
    });
    console.log(propertyForm);
    navigate("/property-form/payment-info");
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10 m-auto text-center mt-10">Basic Information</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 flex-1 bg-accent p-10 rounded m-auto"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Date of Birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Phone number" {...field} />
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


      <Progress value={33} className="w-1/2 m-auto mt-10"/>



    </div>
  );
}
