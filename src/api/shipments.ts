import { ApiListResponse, ShipmentListItem } from "../types";
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
