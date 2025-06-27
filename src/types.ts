import { UrlString } from "./util.types";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
  };
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

export interface ShipmentCounts {
  "كل الشحنات": number;
  "قيد الشحن": number;
  "تم التوصيل": number;
  مكتملة: number;
  متأخرة: number;
  مرتجعة: number;
  ملغيه: number;
}

export interface DashboardData {
  all_shipments: number;
  shipment_by_branch: Record<string, ShipmentCounts>;
  shipment_by_city: Record<string, ShipmentCounts>;
  shipment_by_user: Record<string, ShipmentCounts>;
  from_date: string;
  to_date: string;
  total_shipments_in_range: number;
  applied_filters: {
    loading_date_gte: string | null;
    loading_date_lte: string | null;
  };
}

export type Action = "view" | "edit" | "delete" | "create";
export type Resource =
  | "dashboard"
  | "users"
  | "shipments"
  | "drivers"
  | "clients"
  | "recipients"
  | "payment-vouchers";

export type Privilege = `${Action}:${Resource}`;
