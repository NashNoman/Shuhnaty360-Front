import { ApiListResponse, ApiResponse, Client, RegisterClient } from "../types";
import api from "../utils/api";

const clientsEndpoint = "/clients/";

export const getClientList = async (): Promise<ApiListResponse<Client>> => {
  const response = await api.get(clientsEndpoint);
  return response.data;
};

export const createClient = async (
  client: RegisterClient,
): Promise<ApiResponse<Client>> => {
  const response = await api.post(`${clientsEndpoint}create/`, client);
  return response.data;
};
