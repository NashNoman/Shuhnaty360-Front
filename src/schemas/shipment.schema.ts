import * as z from "zod";
import { fixHtmlFormOptionalFields } from "../utils/utils";

export const shipmentSerializerSchema = fixHtmlFormOptionalFields(
  z.object({
    // user: z.number({
    //   required_error: "المستخدم مطلوب",
    //   invalid_type_error: "المستخدم يجب أن يكون رقمًا",
    // }),
    driver: z.number({
      required_error: "السائق مطلوب",
      invalid_type_error: "السائق يجب أن يكون رقمًا",
    }),
    truck_type: z.number({
      required_error: "نوع الشاحنة مطلوب",
      invalid_type_error: "نوع الشاحنة يجب أن يكون رقمًا",
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
      .datetime({
        message: "تاريخ التحميل غير صالح",
      })
      .optional(),
    days_to_arrive: z
      .number({
        required_error: "عدد أيام الوصول مطلوب",
        invalid_type_error: "عدد أيام الوصول يجب أن يكون رقمًا",
      })
      .positive({
        message: "عدد أيام الوصول يجب أن يكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    expected_arrival_date: z
      .string({
        required_error: "تاريخ الوصول المتوقع مطلوب",
        invalid_type_error: "تاريخ الوصول المتوقع يجب أن يكون نصًا",
      })
      .datetime({
        message: "تاريخ الوصول المتوقع غير صالح",
      })
      .optional(),
    actual_delivery_date: z
      .string({
        invalid_type_error: "تاريخ التسليم الفعلي يجب أن يكون نصًا",
      })
      .datetime({
        message: "تاريخ التسليم الفعلي غير صالح",
      })
      .optional(),
    contents: z
      .string({
        invalid_type_error: "محتويات الشحنة يجب أن تكون نصًا",
      })
      .min(1, { message: "محتويات الشحنة مطلوبة" })
      .nullable()
      .optional(),
    weight: z.coerce
      .number({
        invalid_type_error: "وزن الشحنة يجب أن يكون رقمًا",
      })
      .gt(0, {
        message: "وزن الشحنة مطلوب ويجب أن يكون أكبر من 0",
      })
      .nullable()
      .optional(),
    notes: z
      .string({
        invalid_type_error: "ملاحظات الشحنة يجب أن تكون نصًا",
      })
      .nullable()
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
      .max(50, { message: "رقم فاتورة العميل يجب ألا يزيد عن 50 حرفًا" })
      .nullable()
      .optional(),
    notes_customer: z
      .string({
        invalid_type_error: "ملاحظات العميل يجب أن تكون نصًا",
      })
      .nullable()
      .optional(),
    recipient: z.number({
      required_error: "المستلم مطلوب",
      invalid_type_error: "المستلم يجب أن يكون رقمًا",
    }),
    notes_recipient: z
      .string({
        invalid_type_error: "ملاحظات المستلم يجب أن تكون نصًا",
      })
      .nullable()
      .optional(),
    fare: z.coerce
      .number({
        required_error: "الأجرة مطلوبة",
        invalid_type_error: "الأجرة يجب أن تكون رقمًا",
      })
      .positive({
        message: "الأجرة يجب أن تكون أكبر من صفر",
      }),
    premium: z.coerce
      .number({
        invalid_type_error: "القيمة الإضافية يجب أن تكون رقمًا",
      })
      .positive({
        message: "القيمة الإضافية يجب أن تكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    fare_return: z.coerce
      .number({
        invalid_type_error: "الأجرة المرتجعة يجب أن تكون رقمًا",
      })
      .positive({
        message: "الأجرة المرتجعة يجب أن تكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    days_stayed: z.coerce
      .number({
        invalid_type_error: "عدد أيام البقاء يجب أن يكون رقمًا",
      })
      .positive({
        message: "عدد أيام البقاء يجب أن يكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    stay_cost: z.coerce
      .number({
        invalid_type_error: "تكلفة البقاء يجب أن تكون رقمًا",
      })
      .positive({
        message: "تكلفة البقاء يجب أن تكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    deducted: z.coerce
      .number({
        invalid_type_error: "المخصوم يجب أن يكون رقمًا",
      })
      .positive({
        message: "المخصوم يجب أن يكون أكبر من صفر",
      })
      .nullable()
      .optional(),
    status: z.coerce.number({
      required_error: "حالة الشحنة مطلوبة",
      invalid_type_error: "الحالة يجب أن تكون رقمًا",
    }),
  }),
);

export type ShipmentSerializerSchema = z.infer<typeof shipmentSerializerSchema>;
