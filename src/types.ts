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
