import * as z from "zod";

export const shipmentSerializerSchema = z.object({
  user: z
    .number({
      required_error: "المستخدم مطلوب",
      invalid_type_error: "المستخدم يجب أن يكون رقمًا",
    })
    .optional(),
  driver: z.number({
    required_error: "السائق مطلوب",
    invalid_type_error: "السائق يجب أن يكون رقمًا",
  }),
  origin_city: z.number({
    required_error: "مدينة التحميل مطلوبة",
    invalid_type_error: "مدينة التحميل يجب أن تكون رقمًا",
  }),
  destination_city: z.number({
    required_error: "مدينة الوجهة مطلوبة",
    invalid_type_error: "مدينة الوجهة يجب أن تكون رقمًا",
  }),
  loading_date: z
    .string({
      required_error: "تاريخ التحميل مطلوب",
      invalid_type_error: "تاريخ التحميل يجب أن يكون نصًا",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "تاريخ التحميل غير صالح",
    }),
  days_to_arrive: z
    .number({
      required_error: "عدد أيام الوصول مطلوب",
      invalid_type_error: "عدد أيام الوصول يجب أن يكون رقمًا",
    })
    .optional(),
  expected_arrival_date: z
    .string({
      required_error: "تاريخ الوصول المتوقع مطلوب",
      invalid_type_error: "تاريخ الوصول المتوقع مطلوب",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "تاريخ الوصول المتوقع مطلوب",
    }),
  actual_delivery_date: z
    .string({
      required_error: "تاريخ التسليم الفعلي مطلوب",
      invalid_type_error: "تاريخ التسليم الفعلي يجب أن يكون نصًا",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "تاريخ التسليم الفعلي مطلوب",
    })
    .optional(),
  contents: z.string().min(1, {
    message: "محتويات الشحنة مطلوبة",
    // invalid_type_error: "محتويات الشحنة يجب أن تكون نصًا",
  }),
  weight: z.coerce
    .number({
      required_error: "وزن الشحنة مطلوب",
      invalid_type_error: "وزن الشحنة يجب أن يكون رقمًا",
    })
    .gt(0, {
      message: "وزن الشحنة مطلوب",
    }),
  notes: z
    .string({
      required_error: "ملاحظات الشحنة مطلوبة",
      invalid_type_error: "ملاحظات الشحنة يجب أن تكون نصًا",
    })
    .optional(),
  client: z.number({
    required_error: "العميل مطلوب",
    invalid_type_error: "العميل يجب أن يكون رقمًا",
  }),
  client_branch: z.number({
    required_error: "فرع العميل مطلوب",
    invalid_type_error: "فرع العميل يجب أن يكون رقمًا",
  }),
  client_invoice_number: z
    .string({
      invalid_type_error: "رقم فاتورة العميل يجب أن يكون نصًا",
    })
    .min(1, {
      message: "رقم فاتورة العميل مطلوب",
    })
    .max(50, { message: "رقم فاتورة العميل يجب ألا يزيد عن 50 حرفًا" }),
  notes_customer: z.string({
    required_error: "ملاحظات العميل مطلوبة",
    invalid_type_error: "ملاحظات العميل يجب أن تكون نصًا",
  }),
  recipient: z.number({
    required_error: "المستلم مطلوب",
    invalid_type_error: "المستلم يجب أن يكون رقمًا",
  }),
  notes_recipient: z.string({
    required_error: "ملاحظات المستلم مطلوبة",
    invalid_type_error: "ملاحظات المستلم يجب أن تكون نصًا",
  }),
  fare: z.coerce
    .number({
      required_error: "الأجرة مطلوبة",
      invalid_type_error: "الأجرة يجب أن تكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  premium: z.coerce
    .number({
      required_error: "القيمة الإضافية مطلوبة",
      invalid_type_error: "القيمة الإضافية يجب أن تكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  fare_return: z.coerce
    .number({
      required_error: "قيمة العودة مطلوبة",
      invalid_type_error: "قيمة العودة يجب أن تكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  days_stayed: z.coerce
    .number({
      required_error: "عدد أيام البقاء مطلوب",
      invalid_type_error: "عدد أيام البقاء يجب أن يكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  stay_cost: z.coerce
    .number({
      required_error: "تكلفة البقاء مطلوبة",
      invalid_type_error: "تكلفة البقاء يجب أن تكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  deducted: z.coerce
    .number({
      required_error: "المخصوم مطلوب",
      invalid_type_error: "المخصوم يجب أن يكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    }),
  status: z
    .number({
      required_error: "الحالة مطلوبة",
      invalid_type_error: "الحالة يجب أن تكون رقمًا",
    })
    .gt(0, {
      message: "مطلوب",
    })
    .optional(),
});

export type ShipmentSerializerSchema = z.infer<typeof shipmentSerializerSchema>;
