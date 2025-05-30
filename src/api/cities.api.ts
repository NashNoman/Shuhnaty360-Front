import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiListResponse } from "../types";
import { City } from "../types/cities.types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const CITIES_ENDPOINT = "/cities/";

export const useCitiesInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<City>(["cities"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<City>>(
        CITIES_ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });
