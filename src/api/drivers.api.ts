import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { DriverCreate, DriverList, TruckType } from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/drivers/";
const KEY = "drivers";

export const useDriversInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<DriverList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<DriverList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useDriverQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DriverList>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useTruckTypesInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<TruckType>(["truckTypes"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<TruckType>>(
        ENDPOINT + `TruckType/?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: DriverCreate) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء السائق");
    },
  });

  return mutation;
};

export const useUpdateDriver = (id?: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: DriverCreate) => {
      const response = await api.patch(ENDPOINT + `update/${id}`, formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث السائق");
    },
  });

  return mutation;
};

export const useDeleteDriver = () => {
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
      toast.error(err?.message || "حدث خطأ أثناء حذف السائق");
    },
  });

  return mutation;
};
