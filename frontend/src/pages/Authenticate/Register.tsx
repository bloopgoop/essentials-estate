import { zodResolver } from "@hookform/resolvers/zod";
import registerBackground from "assets/register-background.jpg";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "services/axiosConfigs.js";
import { z } from "zod";
import "./Authenticate.css";

/*
not finished
change <form> to router dom's form.
add client side checking
also style error messages
add check box saying 'agree to terms and conditions'
add icons to the input bars to the right
*/

const registerFormSchema = z.object({
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
  username: z
    .string()
    .max(150, {
      message: "Username must be less than 150 characters.",
    })
    .min(5, {
      message: "Username must be more than 5 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .max(150, {
      message: "Password must be less than 150 characters.",
    })
    .min(6, {
      message: "Password must be more than 6 characters.",
    }),
  verify_password: z
    .string()
    .max(150, {
      message: "Password must be less than 150 characters.",
    })
    .min(6, {
      message: "Password must be more than 6 characters.",
    }),
  terms: z.boolean().default(false),
});

export default function Register() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      verify_password: "",
      terms: false,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.password !== values.verify_password) {
      alert("Passwords do not match");
      return;
    }
    if (!values.terms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    const registerForm = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    axios.post("/api/register/", registerForm).then((res) => {
      if (res.status === 201) {
        alert(
          "Registered successfully, please check your email to verify your account."
        );
        navigate("/login");
      } else {
        console.log(res);
        alert("Error registering");
      }
    });
  }

  return (
    <div id="authenticate">
      <div id="image-container">
        <img id="img" src={registerBackground} alt="background" />
      </div>

      <div className="auth-container bg-background">
        <h1 className="text-xl font-bold mt-16">Sign Up</h1>
        <p className="mb-16">Create Your Account</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 flex-1">
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
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="input" placeholder="Username" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verify_password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Verify Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Agree to terms and conditions</FormLabel>
                </FormItem>
              )}
            />

            <Button className="float-right" type="submit">
              Register
            </Button>
          </form>
        </Form>
        <div className="footer mb-10">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="hover:bg-accent p-1 rounded">
              Sign In
            </Link>
          </p>
          <p>
            Just browsing?{" "}
            <Link to="/" className="hover:bg-accent p-1 rounded">
              Continue as guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
