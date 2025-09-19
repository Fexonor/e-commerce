import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("this field cant be empty"),
  phone: z.string().nonempty().regex(/^01[0251][0-9]{8}$/,'not vaild number'),
  city: z.string().nonempty("this field cant be empty"),
});


  export type checkoutSchemaType = z.infer<typeof checkoutSchema>;