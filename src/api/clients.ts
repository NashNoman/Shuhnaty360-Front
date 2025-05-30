import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ApiListResponse, ApiResponse, Client, RegisterClient } from "../types";
import { ClientListItem } from "../types/clients.types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

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

export const useClientsInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<ClientListItem>(["clients"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ClientListItem>>(
        clientsEndpoint + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useClientQuery = (id?: number) =>
  useQuery({
    queryKey: ["clients", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Client>>(
        clientsEndpoint + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
