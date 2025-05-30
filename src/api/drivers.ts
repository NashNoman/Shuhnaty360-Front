import { infiniteQueryOptions } from "@tanstack/react-query";
import { flatMap } from "lodash";
import { ApiListResponse, Driver } from "../types";
import api from "../utils/api";
import { getUrlParams } from "../utils/utils";

const driverEndpoint = "/drivers/";

export const getDriversList = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<ApiListResponse<Driver>> => {
  const response = await api.get(driverEndpoint + `?page=${pageParam}`);
  return response.data;
};

export const getDriver = async (
  driverId: Pick<Driver, "id">,
): Promise<Driver> => {
  const response = await api.get(`${driverEndpoint}${driverId.id}/`);
  return response.data;
};

export const createDriver = async (driver: Driver): Promise<Driver> => {
  const response = await api.post(`${driverEndpoint}create/`, driver);
  return response.data;
};

export const updateDriver = async (
  driverId: Pick<Driver, "id">,
  driver: Driver,
): Promise<Driver> => {
  const response = await api.patch(`${driverEndpoint}${driverId}/`, driver);
  return response.data;
};

export const deleteDriver = async (
  driverId: Pick<Driver, "id">,
): Promise<void> => {
  await api.delete(`${driverEndpoint}${driverId.id}/`);
};

export const getDriversListOptions = () =>
  infiniteQueryOptions({
    queryKey: ["drivers"],
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
