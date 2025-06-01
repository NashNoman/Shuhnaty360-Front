import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiListResponse, ApiResponse } from "../types";
import {
  Recipient,
  RecipientSerializerCreate,
  RecipientSerializerList,
} from "../types/recipients.types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const RECIPIENTS_ENDPOINT = "/recipient/";

export const useRecipientsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<RecipientSerializerList>(["recipients"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<RecipientSerializerList>>(
        RECIPIENTS_ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useRecipientQuery = (id?: number) =>
  useQuery({
    queryKey: ["recipients", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Recipient>>(
        RECIPIENTS_ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateRecipient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.post(
        RECIPIENTS_ENDPOINT + "create/",
        formData,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حصل خطاء");
    },
  });

  return mutation;
};

export const useUpdateRecipient = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.patch(RECIPIENTS_ENDPOINT + `${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
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
      const response = await api.delete(RECIPIENTS_ENDPOINT + `${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "حدث خطأ أثناء حذف العميل");
    },
  });
};
