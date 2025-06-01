export type RecipientSerializerList = {
  id: number;
  city?: string;
  name: string;
  address?: string | null;
  phone_number?: string | null;
  second_phone_number?: string | null;
  email?: string | null;
};

export type RecipientSerializerCreate = {
  name: string;
  address: string;
  phone_number: string | null;
  second_phone_number?: string;
  email?: string | null;
  city: number;
};

export type Recipient = {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  second_phone_number?: string | null;
  email?: string | null;
  city: number;
};
