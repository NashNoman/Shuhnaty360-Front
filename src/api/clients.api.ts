import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ClientSerializerDetails, ClientSerializerList } from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/clients/";
const KEY = "clients";

export const useClientsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ClientSerializerList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ClientSerializerList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useClientQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ClientSerializerDetails>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientSerializerList) => {
      const response = await api.post(ENDPOINT, formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء العميل");
    },
  });

  return mutation;
};

export const useUpdateClient = (id?: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientSerializerDetails) => {
      const response = await api.patch(ENDPOINT + `update/${id}`, formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث العميل");
    },
  });

  return mutation;
};

export const useDeleteClient = () => {
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
      toast.error(err?.message || "حدث خطأ أثناء حذف العميل");
    },
  });

  return mutation;
};
