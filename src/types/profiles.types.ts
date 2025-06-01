export type CompanyBranch = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  branch_name_ar?: string | null;
  branch_name_en?: string | null;
  main_phone_number?: string | null;
  secondary_phone_number?: string | null;
  email?: string | null;
  address?: string | null;
  is_active?: boolean;
  company: number;
  city?: number | null;
};
