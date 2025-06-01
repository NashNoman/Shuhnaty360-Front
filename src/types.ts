import { Prettify, UrlString } from "./util.types";

export interface Model {
  id: number;
}

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type RefreshTokenResponse = {
  access: string;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type ApiListResponse<T> = {
  status: string;
  message: string;
  data: {
    count: number;
    next: UrlString | null;
    previous: UrlString | null;
    results: T[];
  };
};

export type CompanyBranch = {
  id: number;
  branch_name_ar: string;
  branch_name_en: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  date_joined?: string;
  phone?: string;
  company_branch?: CompanyBranch;
};

export type RegisterUser = Prettify<
  Omit<User, "id" | "is_active" | "date_joined" | "company_branch"> & {
    password: string;
    password2: string;
    company_branch?: number;
  }
>;

export type UpdateUser = Prettify<
  Omit<User, "id" | "date_joined" | "company_branch"> & {
    company_branch: Partial<Omit<CompanyBranch, "id">>;
  }
>;

export type GetUsersResponse = ApiListResponse<User>;
export type GetUserDetailsResponse = ApiResponse<User>;

export type TruckType = {
  id: number;
  name_ar: string;
  name_en: string;
  description?: string;
};

export type Driver = {
  id: number;
  name: string;
  phone_number: string;
  nationality: string;
  language: "ar" | "en" | "ur";
  identity_number: string;
  vehicle_number: string;
  status: "available" | "offline" | "busy";
  is_active: boolean;
  truck_type?: TruckType;
  created_at: string;
  updated_at: string;
};

export type GetDriversResponse = ApiListResponse<Driver>;
export type GetDriverDetailsResponse = ApiResponse<Driver>;

export type GetTruckTypesResponse = ApiListResponse<TruckType>;

type SerializerMini = {
  id: number;
  username: string;
};

type CitySerializerMini = {
  id: number;
  ar_city: string;
  en_city: string;
};

type StatusSerializerMini = {
  id: number;
  name_ar: string;
  name_en: string;
};

type ShipmentStatusSerializerMini = {
  id: number;
  name_ar: string;
  name_en: string;
};

export type Shipment = {
  id: number;
  tracking_number?: string | null;
  user?: number | null;
  driver?: number | null;
  client?: number | null;
  client_branch?: number | null;
  client_invoice_number?: string | null;
  recipient?: number | null;
  origin_city?: CitySerializerMini;
  destination_city?: CitySerializerMini;
  fare: number;
  premium?: number | null;
  fare_return?: number | null;
  days_stayed?: number | null;
  stay_cost?: number | null;
  deducted?: number | null;
  total_cost?: string;
  days_to_arrive?: number | null;
  expected_arrival_date?: string;
  actual_delivery_date?: string;
  weight?: number | null;
  contents?: string | null;
  notes?: string | null;
  status?: ShipmentStatusSerializerMini;
  loading_date?: string;
  updated_at?: string;
  history?: ShipmentHistory[];
};

export type ShipmentListItem = {
  id: number;
  tracking_number: string;
  user?: SerializerMini;
  driver?: SerializerMini;
  client?: SerializerMini;
  client_branch: SerializerMini;
  client_invoice_number: string;
  notes_customer: string | null;
  recipient: SerializerMini;
  notes_recipient: string | null;
  origin_city: CitySerializerMini;
  destination_city: CitySerializerMini;
  fare: number;
  premium: number | null;
  fare_return: number | null;
  days_stayed: number | null;
  stay_cost: number;
  deducted: number;
  total_cost: number;
  days_to_arrive: number;
  expected_arrival_date: string;
  actual_delivery_date: string;
  notes: string | null;
  weight: number;
  contents: string | null;
  status: StatusSerializerMini;
  loading_at: string;
  updated_at: string;
  history: ShipmentHistory[];
};

export type ShipmentHistory = {
  id: number;
  updated_at: string;
  notes: string | null;
  shipment: number;
  status: number;
  user: number;
};

export type ShipmentSerializerCreate = {
  user?: number | undefined;
  driver?: number | undefined;
  origin_city?: number | undefined;
  destination_city?: number | undefined;
  loading_date?: string | undefined;
  days_to_arrive?: number | undefined;
  expected_arrival_date?: string | undefined;
  actual_delivery_date?: string | undefined;
  contents?: string | undefined;
  weight?: number | undefined;
  notes?: string | undefined;
  client?: number | undefined;
  client_branch?: number | undefined;
  client_invoice_number?: string | undefined;
  notes_customer?: string | undefined;
  recipient?: number | undefined;
  notes_recipient?: string | undefined;
  fare: number;
  premium?: number | undefined;
  fare_return?: number | undefined;
  days_stayed?: number | undefined;
  stay_cost?: number | undefined;
  deducted?: number | undefined;
  status?: number | undefined;
};

export type GetShipmentsResponse = ApiListResponse<ShipmentListItem>;
export type GetShipmentDetailsResponse = ApiResponse<ShipmentListItem>;

export type Branch = {
  id: number;
  name: string;
  address: string;
  name_address: string | null;
  phone_number: string;
  second_phone_number: string | null;
  client: number;
  city: number;
};

export type Client = {
  id: number;
  branches: Branch[] | null;
  name: string;
  address: string;
  phone_number: string;
  second_phone_number: string;
  email: string;
  Commercial_registration_number: string | null;
  dicription: string;
};

export type RegisterClient = Prettify<Omit<Client, "id" | "branches">>;

export type GetClientsResponse = ApiListResponse<Client>;
