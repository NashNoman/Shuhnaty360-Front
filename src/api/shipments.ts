import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ApiListResponse,
  ShipmentListItem,
  ShipmentSerializerCreate,
} from "../types";
import api from "../utils/api";

const shipmentsEndpoint = "/shipments/";

type GetShipmentsListParams = {
  page?: number;
};

export const getShipmentsList = async ({
  page = 1,
}: GetShipmentsListParams): Promise<ApiListResponse<ShipmentListItem>> => {
  const response = await api.get(shipmentsEndpoint + `?page=${page}`);
  return response.data;
};

export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const response = await api.post(shipmentsEndpoint + "create/", formData);
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
