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
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/shipments/";
const KEY = "shipments";

export const useShipmentsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ShipmentSerializerList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ShipmentSerializerList>>(
        ENDPOINT + `?page=${pageParam}`,
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
