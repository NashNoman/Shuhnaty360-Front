import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { flatMap } from "lodash";
import { toast } from "sonner";
import { ClientSerializerList, DriverList, TruckType } from "../../Api";
import { ApiListResponse, Driver } from "../types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";
import { getUrlParams } from "../utils/utils";

const ENDPOINT = "/drivers/";
const KEY = "drivers";

export const getDriversList = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<ApiListResponse<Driver>> => {
  const response = await api.get(ENDPOINT + `?page=${pageParam}`);
  return response.data;
};

export const getDriver = async (
  driverId: Pick<Driver, "id">,
): Promise<Driver> => {
  const response = await api.get(`${ENDPOINT}${driverId.id}/`);
  return response.data;
};

export const createDriver = async (driver: Driver): Promise<Driver> => {
  const response = await api.post(`${ENDPOINT}create/`, driver);
  return response.data;
};

export const updateDriver = async (
  driverId: Pick<Driver, "id">,
  driver: Driver,
): Promise<Driver> => {
  const response = await api.patch(`${ENDPOINT}${driverId}/`, driver);
  return response.data;
};

export const deleteDriver = async (
  driverId: Pick<Driver, "id">,
): Promise<void> => {
  await api.delete(`${ENDPOINT}${driverId.id}/`);
};

export const getDriversListOptions = () =>
  infiniteQueryOptions({
    queryKey: [KEY],
    queryFn: getDriversList,
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) =>
      getUrlParams(lastPage.data.previous)?.page || undefined,
    getNextPageParam: (lastPage) =>
      getUrlParams(lastPage.data.next)?.page || undefined,
    select: (data) =>
      flatMap<Awaited<ReturnType<typeof getDriversList>>, Driver>(
        data.pages,
        (page) => page.data.results,
      ),
  });

export const useDriversInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<DriverList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<DriverList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useTruckTypesInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<TruckType>(["truckTypes"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<TruckType>>(
        ENDPOINT + `TruckType/?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientSerializerList) => {
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
