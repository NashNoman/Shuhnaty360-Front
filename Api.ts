/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CustomTokenObtainPair {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface CustomTokenRefresh {
  /**
   * Refresh
   * @minLength 1
   */
  refresh: string;
  /**
   * Access
   * @minLength 1
   */
  access?: string;
}

export interface TokenVerify {
  /**
   * Token
   * @minLength 1
   */
  token: string;
}

export interface CompanyProfileSerializerMini {
  /** ID */
  id?: number;
  /**
   * اسم الشركة
   * @maxLength 255
   */
  company_name_ar?: string | null;
  /**
   * Company Name
   * @maxLength 255
   */
  company_name_en?: string | null;
  /**
   * Company logo
   * @format uri
   */
  company_logo?: string | null;
  /** وصف الشركة */
  company_description_ar?: string | null;
  /** Company Description */
  company_description_en?: string | null;
  /**
   * الرقم الأساسي
   * @maxLength 20
   */
  main_phone_number?: string | null;
  /**
   * الرقم الفرعي
   * @maxLength 20
   */
  secondary_phone_number?: string | null;
  /**
   * البريد الالكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * الموقع الالكتروني
   * @format uri
   * @maxLength 200
   */
  website?: string | null;
  /** العنوان */
  address?: string | null;
  /** City */
  city?: number | null;
}

export interface AccountsCompanyBranch {
  /** ID */
  id?: number;
  company: CompanyProfileSerializerMini;
  /**
   * اسم الفرع
   * @maxLength 255
   */
  branch_name_ar?: string | null;
  /**
   * Branch Name
   * @maxLength 255
   */
  branch_name_en?: string | null;
  /**
   * الرقم الأساسي
   * @maxLength 20
   */
  main_phone_number?: string | null;
  /**
   * الرقم الفرعي
   * @maxLength 20
   */
  secondary_phone_number?: string | null;
  /**
   * البريد الالكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** العنوان */
  address?: string | null;
  /** Is active */
  is_active?: boolean;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  /** City */
  city?: number | null;
}

export interface Users {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Phone
   * @maxLength 100
   */
  phone?: string | null;
  company_branch: AccountsCompanyBranch;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
}

export interface Register {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * Password
   * @minLength 1
   */
  password: string;
  /**
   * Password2
   * @minLength 1
   */
  password2: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name: string;
  /**
   * Phone
   * @maxLength 100
   */
  phone?: string | null;
  /** Company branch */
  company_branch?: number | null;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
}

export interface UsersUpdate {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Phone
   * @maxLength 100
   */
  phone?: string | null;
  /** Company branch */
  company_branch?: number | null;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
  /** Password */
  password?: string;
  /** Password2 */
  password2?: string;
}

export interface City {
  /** ID */
  id?: number;
  /**
   * المدينة
   * @minLength 1
   * @maxLength 255
   */
  ar_city: string;
  /**
   * City
   * @minLength 1
   * @maxLength 255
   */
  en_city: string;
}

export interface ClientSerializerList {
  /** ID */
  id?: number;
  /**
   * اسم العميل
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @maxLength 255
   */
  address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /**
   * البريد الإلكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * رقم السجل التجاري
   * @maxLength 50
   */
  Commercial_registration_number?: string | null;
  /** وصف */
  dicription?: string | null;
}

export interface ClientMini {
  /** ID */
  id?: number;
  /**
   * اسم العميل
   * @minLength 1
   * @maxLength 255
   */
  name: string;
}

export interface ClientBranchList {
  /** ID */
  id?: number;
  client: ClientMini;
  city: City;
  /**
   * اسم الفرع
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * اسم العنوان
   * @maxLength 255
   */
  name_address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
}

export interface ClientBranchCreate {
  /** ID */
  id?: number;
  /**
   * اسم الفرع
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * اسم العنوان
   * @maxLength 255
   */
  name_address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /** العميل */
  client: number;
  /** المدينة */
  city: number;
}

export interface ClientBranchUpdate {
  /** ID */
  id?: number;
  /**
   * اسم الفرع
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * اسم العنوان
   * @maxLength 255
   */
  name_address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /** العميل */
  client: number;
  /** المدينة */
  city: number;
}

export interface Branch {
  /** ID */
  id?: number;
  city: City;
  /**
   * اسم الفرع
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @minLength 1
   * @maxLength 255
   */
  address: string;
  /**
   * اسم العنوان
   * @maxLength 255
   */
  name_address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /** العميل */
  client: number;
}

export interface ClientSerializerDetails {
  /** ID */
  id?: number;
  branches?: Branch[];
  /**
   * اسم العميل
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @maxLength 255
   */
  address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /**
   * البريد الإلكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * رقم السجل التجاري
   * @maxLength 50
   */
  Commercial_registration_number?: string | null;
  /** وصف */
  dicription?: string | null;
}

export interface DriverList {
  /** ID */
  id?: number;
  /**
   * Truck type
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  truck_type: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  /**
   * اسم السائق
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * رقم الهاتف
   * @minLength 1
   * @maxLength 20
   */
  phone_number: string;
  /**
   * الجنسية
   * @minLength 1
   * @maxLength 100
   */
  nationality: string;
  /** اللغة */
  language?: "en" | "ar" | "ur";
  /**
   * رقم الهوية
   * @minLength 1
   * @maxLength 20
   */
  identity_number: string;
  /**
   * رقم المركبة
   * @minLength 1
   * @maxLength 20
   */
  vehicle_number: string;
  /** حالة السائق */
  status?: "available" | "busy" | "offline";
  /** نشط */
  is_active?: boolean;
}

export interface TruckType {
  /** ID */
  id?: number;
  /**
   * نوع الشاحنة
   * @minLength 1
   * @maxLength 100
   */
  name_ar: string;
  /**
   * Truck_Type
   * @minLength 1
   * @maxLength 100
   */
  name_en: string;
  /** الوصف */
  description?: string | null;
}

export interface DriverCreate {
  /** ID */
  id?: number;
  /**
   * اسم السائق
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * رقم الهاتف
   * @minLength 1
   * @maxLength 20
   */
  phone_number: string;
  /**
   * الجنسية
   * @minLength 1
   * @maxLength 100
   */
  nationality: string;
  /** اللغة */
  language?: "en" | "ar" | "ur";
  /**
   * رقم الهوية
   * @minLength 1
   * @maxLength 20
   */
  identity_number: string;
  /**
   * رقم المركبة
   * @minLength 1
   * @maxLength 20
   */
  vehicle_number: string;
  /** حالة السائق */
  status?: "available" | "busy" | "offline";
  /** نشط */
  is_active?: boolean;
  /**
   * تاريخ الإنشاء
   * @format date-time
   */
  created_at?: string;
  /**
   * تاريخ التحديث
   * @format date-time
   */
  updated_at?: string;
  /** نوع الشاحنة */
  truck_type?: number | null;
}

export interface UserSerializerMini {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
}

export interface DriverSerializerMini {
  /** ID */
  id?: number;
  /**
   * اسم السائق
   * @minLength 1
   * @maxLength 255
   */
  name: string;
}

export interface TruckTypeSerializerMini {
  /** ID */
  id?: number;
  /**
   * نوع الشاحنة
   * @minLength 1
   * @maxLength 100
   */
  name_ar: string;
}

export interface ClientSerializerMini {
  /** ID */
  id?: number;
  /**
   * اسم العميل
   * @minLength 1
   * @maxLength 255
   */
  name: string;
}

export interface BranchSerializerMini {
  /** ID */
  id?: number;
  /**
   * اسم الفرع
   * @minLength 1
   * @maxLength 255
   */
  name: string;
}

export interface RecipientSerializerMini {
  /** ID */
  id?: number;
  /**
   * اسم المستلم
   * @minLength 1
   * @maxLength 255
   */
  name: string;
}

export interface CitySerializerMini {
  /** ID */
  id?: number;
  /**
   * المدينة
   * @minLength 1
   * @maxLength 255
   */
  ar_city: string;
  /**
   * City
   * @minLength 1
   * @maxLength 255
   */
  en_city: string;
}

export interface ShipmentStatusSerializerMini {
  /** ID */
  id?: number;
  /**
   * الحالة
   * @minLength 1
   * @maxLength 50
   */
  name_ar: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 50
   */
  name_en: string;
}

export interface ShipmentHistory {
  /** ID */
  id?: number;
  user?: UserSerializerMini;
  status?: ShipmentStatusSerializerMini;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  /** Notes */
  notes?: string | null;
  /** Shipment */
  shipment: number;
}

export interface ShipmentSerializerList {
  /** ID */
  id?: number;
  /**
   * Tracking number
   * @minLength 1
   */
  tracking_number?: string | null;
  user?: UserSerializerMini;
  driver?: DriverSerializerMini;
  truck_type?: TruckTypeSerializerMini;
  client?: ClientSerializerMini;
  client_branch?: BranchSerializerMini;
  /**
   * Customer Invoice Number
   * @maxLength 50
   */
  client_invoice_number?: string | null;
  /** ملاحظات العميل */
  notes_customer?: string | null;
  recipient?: RecipientSerializerMini;
  /** ملاحظات المستلم */
  notes_recipient?: string | null;
  origin_city?: CitySerializerMini;
  destination_city?: CitySerializerMini;
  /**
   * Fare
   * @min -2147483648
   * @max 2147483647
   */
  fare: number;
  /**
   * Premium
   * @min -2147483648
   * @max 2147483647
   */
  premium?: number | null;
  /**
   * Return
   * @min -2147483648
   * @max 2147483647
   */
  fare_return?: number | null;
  /**
   * Days Stayed
   * @min -2147483648
   * @max 2147483647
   */
  days_stayed?: number | null;
  /**
   * Stay Cost
   * @min -2147483648
   * @max 2147483647
   */
  stay_cost?: number | null;
  /**
   * Deducted
   * @min -2147483648
   * @max 2147483647
   */
  deducted?: number | null;
  /** Total cost */
  total_cost?: string;
  /**
   * عدد الأيام  الوصول
   * @min -2147483648
   * @max 2147483647
   */
  days_to_arrive?: number | null;
  /**
   * Expected arrival date
   * @format date-time
   */
  expected_arrival_date?: string;
  /**
   * Actual delivery date
   * @format date-time
   */
  actual_delivery_date?: string;
  /** ملاحظات */
  notes?: string | null;
  /** وزن الشحنة (طن) */
  weight?: number | null;
  /** محتويات الشحنة */
  contents?: string | null;
  status?: ShipmentStatusSerializerMini;
  /**
   * Loading date
   * @format date-time
   */
  loading_date?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  history?: ShipmentHistory[];
}

export interface PaymentVoucher {
  /** ID */
  id?: number;
  shipment?: ShipmentSerializerList;
  /**
   * Creator
   * @pattern ^[\w.@+-]+$
   */
  creator?: string;
  /**
   * تاريخ الإنشاء
   * @format date-time
   */
  created_at?: string;
  /**
   * تاريخ التحديث
   * @format date-time
   */
  updated_at?: string;
}

export interface CompanyBranch {
  /** ID */
  id?: number;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  /**
   * اسم الفرع
   * @maxLength 255
   */
  branch_name_ar?: string | null;
  /**
   * Branch Name
   * @maxLength 255
   */
  branch_name_en?: string | null;
  /**
   * الرقم الأساسي
   * @maxLength 20
   */
  main_phone_number?: string | null;
  /**
   * الرقم الفرعي
   * @maxLength 20
   */
  secondary_phone_number?: string | null;
  /**
   * البريد الالكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** العنوان */
  address?: string | null;
  /** Is active */
  is_active?: boolean;
  /** Company */
  company: number;
  /** City */
  city?: number | null;
}

export interface CompanyProfile {
  /** ID */
  id?: number;
  /**
   * اسم الشركة
   * @maxLength 255
   */
  company_name_ar?: string | null;
  /**
   * Company Name
   * @maxLength 255
   */
  company_name_en?: string | null;
  /**
   * Company logo
   * @format uri
   */
  company_logo?: string | null;
  /** وصف الشركة */
  company_description_ar?: string | null;
  /** Company Description */
  company_description_en?: string | null;
  /**
   * الرقم الأساسي
   * @maxLength 20
   */
  main_phone_number?: string | null;
  /**
   * الرقم الفرعي
   * @maxLength 20
   */
  secondary_phone_number?: string | null;
  /**
   * البريد الالكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * الموقع الالكتروني
   * @format uri
   * @maxLength 200
   */
  website?: string | null;
  /** العنوان */
  address?: string | null;
  /** City */
  city?: number | null;
  branches?: CompanyBranch[];
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
}

export interface RecipientSerializerList {
  /** ID */
  id?: number;
  /** City */
  city?: string;
  /**
   * اسم المستلم
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @maxLength 255
   */
  address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /**
   * البريد الإلكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
}

export interface RecipientSerializerCreate {
  /** ID */
  id?: number;
  /**
   * اسم المستلم
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * العنوان
   * @maxLength 255
   */
  address?: string | null;
  /**
   * رقم الهاتف
   * @maxLength 20
   */
  phone_number?: string | null;
  /**
   * رقم الهاتف الثاني
   * @maxLength 20
   */
  second_phone_number?: string | null;
  /**
   * البريد الإلكتروني
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** المدينة */
  city: number;
}

export interface ShipmentSerializerCreate {
  /** User */
  user: number;
  /** Driver */
  driver: number;
  /** Truck type */
  truck_type: number;
  /** Origin city */
  origin_city: number;
  /** Destination city */
  destination_city: number;
  /**
   * Loading date
   * @format date-time
   */
  loading_date?: string;
  /**
   * عدد الأيام  الوصول
   * @min -2147483648
   * @max 2147483647
   */
  days_to_arrive?: number | null;
  /**
   * Expected arrival date
   * @format date-time
   */
  expected_arrival_date?: string;
  /**
   * Actual delivery date
   * @format date-time
   */
  actual_delivery_date?: string;
  /** محتويات الشحنة */
  contents?: string | null;
  /** وزن الشحنة (طن) */
  weight?: number | null;
  /** ملاحظات */
  notes?: string | null;
  /** Client */
  client: number;
  /** Client branch */
  client_branch: number;
  /**
   * Customer Invoice Number
   * @maxLength 50
   */
  client_invoice_number?: string | null;
  /** ملاحظات العميل */
  notes_customer?: string | null;
  /** Recipient */
  recipient: number;
  /** ملاحظات المستلم */
  notes_recipient?: string | null;
  /** Fare */
  fare: number;
  /**
   * Premium
   * @min -2147483648
   * @max 2147483647
   */
  premium?: number | null;
  /**
   * Return
   * @min -2147483648
   * @max 2147483647
   */
  fare_return?: number | null;
  /**
   * Days Stayed
   * @min -2147483648
   * @max 2147483647
   */
  days_stayed?: number | null;
  /**
   * Stay Cost
   * @min -2147483648
   * @max 2147483647
   */
  stay_cost?: number | null;
  /**
   * Deducted
   * @min -2147483648
   * @max 2147483647
   */
  deducted?: number | null;
  /** Status */
  status: number;
}

export interface ShipmentStatus {
  /** ID */
  id?: number;
  /**
   * الحالة
   * @minLength 1
   * @maxLength 50
   */
  name_ar: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 50
   */
  name_en: string;
}

export interface ShipmentSerializerUpdate {
  /** Driver */
  driver: number;
  /** Truck type */
  truck_type: number;
  /**
   * Customer Invoice Number
   * @maxLength 50
   */
  client_invoice_number?: string | null;
  /** Client */
  client: number;
  /** Client branch */
  client_branch: number;
  /** Recipient */
  recipient: number;
  /** Status */
  status: number;
  /** Origin city */
  origin_city: number;
  /** Destination city */
  destination_city: number;
  /**
   * عدد الأيام  الوصول
   * @min -2147483648
   * @max 2147483647
   */
  days_to_arrive?: number | null;
  /**
   * تاريخ التحميل
   * @format date-time
   */
  loading_date?: string | null;
  /**
   * Days Stayed
   * @min -2147483648
   * @max 2147483647
   */
  days_stayed?: number | null;
  /**
   * تاريخ الوصول الفعلي
   * @format date-time
   */
  actual_delivery_date?: string | null;
  /**
   * تاريخ الوصول المتوقع
   * @format date-time
   */
  expected_arrival_date?: string | null;
  /** ملاحظات */
  notes?: string | null;
  /** ملاحظات العميل */
  notes_customer?: string | null;
  /** ملاحظات المستلم */
  notes_recipient?: string | null;
  /**
   * Return
   * @min -2147483648
   * @max 2147483647
   */
  fare_return?: number | null;
  /**
   * Deducted
   * @min -2147483648
   * @max 2147483647
   */
  deducted?: number | null;
  /**
   * Stay Cost
   * @min -2147483648
   * @max 2147483647
   */
  stay_cost?: number | null;
  /** وزن الشحنة (طن) */
  weight?: number | null;
  /** محتويات الشحنة */
  contents?: string | null;
  /** Fare */
  fare: number;
  /**
   * Premium
   * @min -2147483648
   * @max 2147483647
   */
  premium?: number | null;
  /** Total cost */
  total_cost?: string;
}

export interface ShipmentSerializerDetail {
  /** ID */
  id?: number;
  /**
   * Tracking number
   * @minLength 1
   */
  tracking_number?: string | null;
  user?: Users;
  driver?: DriverList;
  truck_type?: TruckType;
  client?: ClientSerializerList;
  client_branch?: ClientBranchCreate;
  /**
   * Customer Invoice Number
   * @maxLength 50
   */
  client_invoice_number?: string | null;
  recipient?: RecipientSerializerList;
  origin_city?: City;
  destination_city?: City;
  /**
   * Fare
   * @min -2147483648
   * @max 2147483647
   */
  fare: number;
  /**
   * Premium
   * @min -2147483648
   * @max 2147483647
   */
  premium?: number | null;
  /**
   * Return
   * @min -2147483648
   * @max 2147483647
   */
  fare_return?: number | null;
  /**
   * Days Stayed
   * @min -2147483648
   * @max 2147483647
   */
  days_stayed?: number | null;
  /**
   * Stay Cost
   * @min -2147483648
   * @max 2147483647
   */
  stay_cost?: number | null;
  /**
   * Deducted
   * @min -2147483648
   * @max 2147483647
   */
  deducted?: number | null;
  /** Total cost */
  total_cost?: string;
  /**
   * عدد الأيام  الوصول
   * @min -2147483648
   * @max 2147483647
   */
  days_to_arrive?: number | null;
  /**
   * Expected arrival date
   * @format date-time
   */
  expected_arrival_date?: string;
  /**
   * Actual delivery date
   * @format date-time
   */
  actual_delivery_date?: string;
  /** وزن الشحنة (طن) */
  weight?: number | null;
  /** محتويات الشحنة */
  contents?: string | null;
  /** ملاحظات */
  notes?: string | null;
  status?: ShipmentStatus;
  /**
   * Loading date
   * @format date-time
   */
  loading_date?: string;
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string;
  history?: ShipmentHistory[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://shuhnaty.com/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Shuhnaty API
 * @version v1
 * @license Private License
 * @termsOfService https://www.shuhnaty.com/terms/
 * @baseUrl https://shuhnaty.com/api
 * @contact <contact@shuhnaty.com>
 *
 * API Documentation for Shuhnaty Shipping System
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  accounts = {
    /**
     * No description
     *
     * @tags accounts
     * @name AccountsTokenCreate
     * @request POST:/accounts/token/
     * @secure
     */
    accountsTokenCreate: (
      data: CustomTokenObtainPair,
      params: RequestParams = {},
    ) =>
      this.request<CustomTokenObtainPair, any>({
        path: `/accounts/token/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsTokenRefreshCreate
     * @request POST:/accounts/token/refresh/
     * @secure
     */
    accountsTokenRefreshCreate: (
      data: CustomTokenRefresh,
      params: RequestParams = {},
    ) =>
      this.request<CustomTokenRefresh, any>({
        path: `/accounts/token/refresh/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a token and indicates if it is valid.  This view provides no information about a token's fitness for a particular use.
     *
     * @tags accounts
     * @name AccountsTokenVerifyCreate
     * @request POST:/accounts/token/verify/
     * @secure
     */
    accountsTokenVerifyCreate: (
      data: TokenVerify,
      params: RequestParams = {},
    ) =>
      this.request<TokenVerify, any>({
        path: `/accounts/token/verify/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersList
     * @request GET:/accounts/users/
     * @secure
     */
    accountsUsersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Users[];
        },
        any
      >({
        path: `/accounts/users/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersCreateCreate
     * @request POST:/accounts/users/create/
     * @secure
     */
    accountsUsersCreateCreate: (data: Register, params: RequestParams = {}) =>
      this.request<Register, any>({
        path: `/accounts/users/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersRead
     * @request GET:/accounts/users/{id}/
     * @secure
     */
    accountsUsersRead: (id: number, params: RequestParams = {}) =>
      this.request<Users, any>({
        path: `/accounts/users/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersDelete
     * @request DELETE:/accounts/users/{id}/
     * @secure
     */
    accountsUsersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/accounts/users/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersUpdateUpdate
     * @request PUT:/accounts/users/{id}/update
     * @secure
     */
    accountsUsersUpdateUpdate: (
      id: number,
      data: UsersUpdate,
      params: RequestParams = {},
    ) =>
      this.request<UsersUpdate, any>({
        path: `/accounts/users/${id}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsUsersUpdatePartialUpdate
     * @request PATCH:/accounts/users/{id}/update
     * @secure
     */
    accountsUsersUpdatePartialUpdate: (
      id: number,
      data: UsersUpdate,
      params: RequestParams = {},
    ) =>
      this.request<UsersUpdate, any>({
        path: `/accounts/users/${id}/update`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  cities = {
    /**
     * No description
     *
     * @tags cities
     * @name CitiesList
     * @request GET:/cities/
     * @secure
     */
    citiesList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: City[];
        },
        any
      >({
        path: `/cities/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesCreate
     * @request POST:/cities/
     * @secure
     */
    citiesCreate: (data: City, params: RequestParams = {}) =>
      this.request<City, any>({
        path: `/cities/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesRead
     * @request GET:/cities/{id}
     * @secure
     */
    citiesRead: (id: number, params: RequestParams = {}) =>
      this.request<City, any>({
        path: `/cities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesUpdate
     * @request PUT:/cities/{id}
     * @secure
     */
    citiesUpdate: (id: number, data: City, params: RequestParams = {}) =>
      this.request<City, any>({
        path: `/cities/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesPartialUpdate
     * @request PATCH:/cities/{id}
     * @secure
     */
    citiesPartialUpdate: (id: number, data: City, params: RequestParams = {}) =>
      this.request<City, any>({
        path: `/cities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesDelete
     * @request DELETE:/cities/{id}
     * @secure
     */
    citiesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cities/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  clients = {
    /**
     * No description
     *
     * @tags clients
     * @name ClientsList
     * @request GET:/clients/
     * @secure
     */
    clientsList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ClientSerializerList[];
        },
        any
      >({
        path: `/clients/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsCreate
     * @request POST:/clients/
     * @secure
     */
    clientsCreate: (data: ClientSerializerList, params: RequestParams = {}) =>
      this.request<ClientSerializerList, any>({
        path: `/clients/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchList
     * @request GET:/clients/branch/
     * @secure
     */
    clientsBranchList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ClientBranchList[];
        },
        any
      >({
        path: `/clients/branch/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchCreateCreate
     * @request POST:/clients/branch/create
     * @secure
     */
    clientsBranchCreateCreate: (
      data: ClientBranchCreate,
      params: RequestParams = {},
    ) =>
      this.request<ClientBranchCreate, any>({
        path: `/clients/branch/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchUpdateUpdate
     * @request PUT:/clients/branch/update/{id}
     * @secure
     */
    clientsBranchUpdateUpdate: (
      id: number,
      data: ClientBranchUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ClientBranchUpdate, any>({
        path: `/clients/branch/update/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchUpdatePartialUpdate
     * @request PATCH:/clients/branch/update/{id}
     * @secure
     */
    clientsBranchUpdatePartialUpdate: (
      id: number,
      data: ClientBranchUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ClientBranchUpdate, any>({
        path: `/clients/branch/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchRead
     * @request GET:/clients/branch/{id}
     * @secure
     */
    clientsBranchRead: (id: number, params: RequestParams = {}) =>
      this.request<ClientBranchList, any>({
        path: `/clients/branch/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsBranchDelete
     * @request DELETE:/clients/branch/{id}
     * @secure
     */
    clientsBranchDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/clients/branch/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsRead
     * @request GET:/clients/{id}
     * @secure
     */
    clientsRead: (id: number, params: RequestParams = {}) =>
      this.request<ClientSerializerDetails, any>({
        path: `/clients/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsUpdate
     * @request PUT:/clients/{id}
     * @secure
     */
    clientsUpdate: (
      id: number,
      data: ClientSerializerDetails,
      params: RequestParams = {},
    ) =>
      this.request<ClientSerializerDetails, any>({
        path: `/clients/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsPartialUpdate
     * @request PATCH:/clients/{id}
     * @secure
     */
    clientsPartialUpdate: (
      id: number,
      data: ClientSerializerDetails,
      params: RequestParams = {},
    ) =>
      this.request<ClientSerializerDetails, any>({
        path: `/clients/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags clients
     * @name ClientsDelete
     * @request DELETE:/clients/{id}
     * @secure
     */
    clientsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/clients/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  drivers = {
    /**
     * No description
     *
     * @tags drivers
     * @name DriversList
     * @request GET:/drivers/
     * @secure
     */
    driversList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: DriverList[];
        },
        any
      >({
        path: `/drivers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversTruckTypeList
     * @request GET:/drivers/TruckType/
     * @secure
     */
    driversTruckTypeList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: TruckType[];
        },
        any
      >({
        path: `/drivers/TruckType/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversTruckTypeCreate
     * @request POST:/drivers/TruckType/
     * @secure
     */
    driversTruckTypeCreate: (data: TruckType, params: RequestParams = {}) =>
      this.request<TruckType, any>({
        path: `/drivers/TruckType/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversCreateCreate
     * @request POST:/drivers/create/
     * @secure
     */
    driversCreateCreate: (data: DriverCreate, params: RequestParams = {}) =>
      this.request<DriverCreate, any>({
        path: `/drivers/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversUpdateUpdate
     * @request PUT:/drivers/update/{id}
     * @secure
     */
    driversUpdateUpdate: (
      id: number,
      data: DriverCreate,
      params: RequestParams = {},
    ) =>
      this.request<DriverCreate, any>({
        path: `/drivers/update/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversUpdatePartialUpdate
     * @request PATCH:/drivers/update/{id}
     * @secure
     */
    driversUpdatePartialUpdate: (
      id: number,
      data: DriverCreate,
      params: RequestParams = {},
    ) =>
      this.request<DriverCreate, any>({
        path: `/drivers/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversRead
     * @request GET:/drivers/{id}
     * @secure
     */
    driversRead: (id: number, params: RequestParams = {}) =>
      this.request<DriverList, any>({
        path: `/drivers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags drivers
     * @name DriversDelete
     * @request DELETE:/drivers/{id}
     * @secure
     */
    driversDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/drivers/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  paymentVouchers = {
    /**
     * @description عرض قائمة السندات وإنشاء سند جديد
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersList
     * @request GET:/payment-vouchers/payment-vouchers/
     * @secure
     */
    paymentVouchersPaymentVouchersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: PaymentVoucher[];
        },
        any
      >({
        path: `/payment-vouchers/payment-vouchers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description عرض قائمة السندات وإنشاء سند جديد
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersCreate
     * @request POST:/payment-vouchers/payment-vouchers/
     * @secure
     */
    paymentVouchersPaymentVouchersCreate: (
      data: PaymentVoucher,
      params: RequestParams = {},
    ) =>
      this.request<PaymentVoucher, any>({
        path: `/payment-vouchers/payment-vouchers/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description عرض وتحديث وحذف سند
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersRead
     * @request GET:/payment-vouchers/payment-vouchers/{id}/
     * @secure
     */
    paymentVouchersPaymentVouchersRead: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<PaymentVoucher, any>({
        path: `/payment-vouchers/payment-vouchers/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description عرض وتحديث وحذف سند
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersUpdate
     * @request PUT:/payment-vouchers/payment-vouchers/{id}/
     * @secure
     */
    paymentVouchersPaymentVouchersUpdate: (
      id: number,
      data: PaymentVoucher,
      params: RequestParams = {},
    ) =>
      this.request<PaymentVoucher, any>({
        path: `/payment-vouchers/payment-vouchers/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description عرض وتحديث وحذف سند
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersPartialUpdate
     * @request PATCH:/payment-vouchers/payment-vouchers/{id}/
     * @secure
     */
    paymentVouchersPaymentVouchersPartialUpdate: (
      id: number,
      data: PaymentVoucher,
      params: RequestParams = {},
    ) =>
      this.request<PaymentVoucher, any>({
        path: `/payment-vouchers/payment-vouchers/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description عرض وتحديث وحذف سند
     *
     * @tags payment-vouchers
     * @name PaymentVouchersPaymentVouchersDelete
     * @request DELETE:/payment-vouchers/payment-vouchers/{id}/
     * @secure
     */
    paymentVouchersPaymentVouchersDelete: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/payment-vouchers/payment-vouchers/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags profile
     * @name ProfileList
     * @request GET:/profile/
     * @secure
     */
    profileList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: CompanyProfile[];
        },
        any
      >({
        path: `/profile/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags profile
     * @name ProfileBranchList
     * @request GET:/profile/branch/
     * @secure
     */
    profileBranchList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: CompanyBranch[];
        },
        any
      >({
        path: `/profile/branch/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  recipient = {
    /**
     * No description
     *
     * @tags recipient
     * @name RecipientList
     * @request GET:/recipient/
     * @secure
     */
    recipientList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: RecipientSerializerList[];
        },
        any
      >({
        path: `/recipient/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipient
     * @name RecipientCreateCreate
     * @request POST:/recipient/create/
     * @secure
     */
    recipientCreateCreate: (
      data: RecipientSerializerCreate,
      params: RequestParams = {},
    ) =>
      this.request<RecipientSerializerCreate, any>({
        path: `/recipient/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipient
     * @name RecipientRead
     * @request GET:/recipient/{id}
     * @secure
     */
    recipientRead: (id: number, params: RequestParams = {}) =>
      this.request<RecipientSerializerCreate, any>({
        path: `/recipient/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipient
     * @name RecipientUpdate
     * @request PUT:/recipient/{id}
     * @secure
     */
    recipientUpdate: (
      id: number,
      data: RecipientSerializerCreate,
      params: RequestParams = {},
    ) =>
      this.request<RecipientSerializerCreate, any>({
        path: `/recipient/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipient
     * @name RecipientPartialUpdate
     * @request PATCH:/recipient/{id}
     * @secure
     */
    recipientPartialUpdate: (
      id: number,
      data: RecipientSerializerCreate,
      params: RequestParams = {},
    ) =>
      this.request<RecipientSerializerCreate, any>({
        path: `/recipient/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipient
     * @name RecipientDelete
     * @request DELETE:/recipient/{id}
     * @secure
     */
    recipientDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipient/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  shipments = {
    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsList
     * @request GET:/shipments/
     * @secure
     */
    shipmentsList: (
      query?: {
        /** A search term. */
        search?: string;
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ShipmentSerializerList[];
        },
        any
      >({
        path: `/shipments/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsCreateCreate
     * @request POST:/shipments/create/
     * @secure
     */
    shipmentsCreateCreate: (
      data: ShipmentSerializerCreate,
      params: RequestParams = {},
    ) =>
      this.request<ShipmentSerializerCreate, any>({
        path: `/shipments/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsStatusList
     * @request GET:/shipments/status/
     * @secure
     */
    shipmentsStatusList: (
      query?: {
        /** A search term. */
        search?: string;
        /** A page number within the paginated result set. */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ShipmentStatus[];
        },
        any
      >({
        path: `/shipments/status/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsStatusCreate
     * @request POST:/shipments/status/
     * @secure
     */
    shipmentsStatusCreate: (data: ShipmentStatus, params: RequestParams = {}) =>
      this.request<ShipmentStatus, any>({
        path: `/shipments/status/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdateUpdate
     * @request PUT:/shipments/update/{id}
     * @secure
     */
    shipmentsUpdateUpdate: (
      id: number,
      data: ShipmentSerializerUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ShipmentSerializerUpdate, any>({
        path: `/shipments/update/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdatePartialUpdate
     * @request PATCH:/shipments/update/{id}
     * @secure
     */
    shipmentsUpdatePartialUpdate: (
      id: number,
      data: ShipmentSerializerUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ShipmentSerializerUpdate, any>({
        path: `/shipments/update/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsRead
     * @request GET:/shipments/{id}
     * @secure
     */
    shipmentsRead: (id: number, params: RequestParams = {}) =>
      this.request<ShipmentSerializerDetail, any>({
        path: `/shipments/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsDelete
     * @request DELETE:/shipments/{id}
     * @secure
     */
    shipmentsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/shipments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
