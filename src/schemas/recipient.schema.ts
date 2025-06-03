import * as z from "zod";

export const recipientSerializerSchema = z.object({
  name: z.string().min(1, { message: "اسم العميل مطلوب" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  phone_number: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
  second_phone_number: z.string().optional(),
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
  city: z.number({
    required_error: "المدينة مطلوبة",
    invalid_type_error: "المدينة يجب أن تكون رقمًا",
  }),
});

export type RecipientSerializerSchema = z.infer<
  typeof recipientSerializerSchema
>;
