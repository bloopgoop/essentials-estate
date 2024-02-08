import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "services/axiosConfigs";
import { Rating } from "types/rating";
import { z } from "zod";
import "./Property.css";

const ratingFormSchema = z.object({
  stars: z.coerce
    .number()
    .gte(0, {
      message: "Rating must be from 0-5 stars.",
    })
    .lte(5, {
      message: "Rating must be from 0-5 stars.",
    }),
  comment: z.string().max(255, {
    message: "Comment must be less than 255 characters.",
  }),
});

export default function RatingForm({
  ratings,
  setRatings,
}: {
  ratings: Rating[];
  setRatings: Function;
}) {
  const { id } = useParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      stars: 0,
      comment: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ratingFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const formData = new FormData();
    formData.append("stars", values.stars.toString());
    formData.append("comment", values.comment.toString());
    const request = axios.post(`property/rating/${id}`, formData);
    request
      .then((response) => {
        console.log("Success:", response.data);
        setRatings([...ratings, response.data]);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  }

  return (
    <div className="post--box bg-accent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
          <FormField
            control={form.control}
            name="stars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stars</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                  This is how many stars you would rate this property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <textarea
                    className="h-40 bg-background w-full items-baseline p-2 text-foreground resize-none"
                    placeholder="Your comments"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your comment on this property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="float-right" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
