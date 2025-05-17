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

export type Driver = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  phone_number: string;
  nationality: string;
  language: "ar" | "en" | "ur";
  identity_number: string;
  vehicle_number: string;
  status: "available" | "offline" | "busy";
  is_active: boolean;
  truck_type?: number;
};
