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
    next: string | null;
    previous: string | null;
    results: T[];
  };
};

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: string;
  is_active: boolean;
  date_joined?: Date;
  phone?: string;
  company_branch?: string;
};

export type GetUsersResponse = ApiListResponse<User>;
export type GetUserDetailsResponse = ApiResponse<User>;

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
  truck_type?: number;
  created_at: string;
  updated_at: string;
};

export type GetDriversResponse = ApiListResponse<Driver>;
export type GetDriverDetailsResponse = ApiResponse<Driver>;

export type TruckType = {
  id: number;
  name_ar: string;
  name_en: string;
  description?: string;
};

export type GetTruckTypesResponse = ApiListResponse<TruckType>;
