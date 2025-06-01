export type UserCreate = {
  username: string;
  email?: string | null;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  is_active?: boolean;
  phone?: string | null;
  company_branch?: number | null;
};

export type UserUpdate = Partial<UserCreate>;
