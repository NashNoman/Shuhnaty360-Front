import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ShipmentSerializerCreate, ShipmentSerializerList } from "../../Api";
import { ApiListResponse } from "../types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/shipments/";

export const useShipmentsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ShipmentSerializerList>(["shipments"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ShipmentSerializerList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حصل خطاء");
    },
  });

  return mutation;
};
