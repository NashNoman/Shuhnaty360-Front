import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { RecipientSerializerCreate, RecipientSerializerList } from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/recipient/";
const KEY = "recipients";

export const useRecipientsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<RecipientSerializerList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<RecipientSerializerList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useRecipientQuery = (id?: number) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<RecipientSerializerCreate>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateRecipient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حصل خطاء");
    },
  });

  return mutation;
};

export const useUpdateRecipient = (id?: number | string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.patch(ENDPOINT + `${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "حدث خطأ أثناء تحديث العميل");
    },
  });
};

export const useDeleteRecipient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id?: number) => {
      const response = await api.delete(ENDPOINT + `${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "حدث خطأ أثناء حذف العميل");
    },
  });
};
