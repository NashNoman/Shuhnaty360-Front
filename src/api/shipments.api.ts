import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ShipmentSerializerCreate,
  ShipmentSerializerDetail,
  ShipmentSerializerList,
  ShipmentStatus,
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";
import { removeNullOrBlankFields } from "../utils/utils";

const ENDPOINT = "/shipments/";
const KEY = "shipments";

export type ShipmentFiltersType = {
  user?: number | string;
  driver?: number | string;
  client?: number | string;
  client_branch?: number | string;
  recipient?: number | string;
  status?: number | string;
  loading_date?: string;
  client_invoice_number?: string;
  search?: string;
};

export const useShipmentsInfinityQuery = (
  filters?: ShipmentFiltersType | undefined,
) =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ShipmentSerializerList>([KEY, filters]),
    queryFn: async ({ pageParam }) => {
      const paramsObj: Record<string, string> = {};
      if (pageParam !== undefined) paramsObj.page = String(pageParam);
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            paramsObj[key] = String(value);
          }
        });
      }
      const params = new URLSearchParams(paramsObj);
      const response = await api.get<ApiListResponse<ShipmentSerializerList>>(
        ENDPOINT + `?${params.toString()}`,
      );
      return response.data;
    },
  });

export const useShipmentStatusInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ShipmentStatus>([KEY + "status"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ShipmentStatus>>(
        ENDPOINT + `status/?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useShipmentQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ShipmentSerializerDetail>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const data = removeNullOrBlankFields(formData);
      console.log("Creating shipment with data:", data);

      const response = await api.post(ENDPOINT + "create/", data);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حصل خطاء عند إنشاء الشحنة");
    },
  });

  return mutation;
};

export const useUpdateShipment = (id?: number | string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const data = removeNullOrBlankFields(formData);
      const response = await api.patch(ENDPOINT + `update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث الشحنة");
    },
  });
};

export const useDeleteShipment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id?: number | string) => {
      const response = await api.delete(ENDPOINT + id);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء حذف الشحنة");
    },
  });

  return mutation;
};
