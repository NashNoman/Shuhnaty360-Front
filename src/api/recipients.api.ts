import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiListResponse } from "../types";
import {
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
