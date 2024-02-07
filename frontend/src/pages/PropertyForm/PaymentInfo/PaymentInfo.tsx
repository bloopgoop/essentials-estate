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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "components/ui/progress";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, {
      message: "Please enter a valid card number.",
    })
    .max(16, {
      message: "Please enter a valid card number.",
    }),

  expirationDate: z.string(),
  cvv: z
    .string()
    .min(3, {
      message: "Please enter a valid cvv.",
    })
    .max(3, {
      message: "Please enter a valid cvv.",
    }),
});

export default function BasicInfo() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });
  function onSubmit(values: z.infer<typeof paymentSchema>) {
    navigate("/property-form/property-info");
  }

  return (
    <div>
      <div className="mb-10 m-auto text-center mt-10">
        <h1 className="text-4xl font-semibold">Payment Information</h1>
        <p>We do not save any of your data.</p>
        <p>As this is just a demo website, you can skip this part</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 flex-1 bg-accent p-10 rounded m-auto"
        >
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Card number</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Card number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Expiration date</FormLabel>
                <FormControl>
                  <Input
                    type="input"
                    placeholder="Expiration date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="CVV" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link to="/property-form/property-info">
            <Button>Skip</Button>
          </Link>

          <Button className="float-right" type="submit">
            Save and continue
          </Button>
        </form>
      </Form>

      <Progress value={66} className="w-1/2 m-auto mt-10" />
    </div>
  );
}
