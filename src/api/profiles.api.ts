import { useInfiniteQuery } from "@tanstack/react-query";
import { flatMap } from "lodash";
import { CompanyBranch } from "../../Api";
import { ApiListResponse } from "../types";
import api from "../utils/api";
import { getUrlParams } from "../utils/utils";

const ENDPOINT = "/profile/";

type BranchResponse = ApiListResponse<CompanyBranch>["data"];

export const useCompanyBranchesInfinityQuery = () =>
  useInfiniteQuery({
    queryKey: ["profiles", "branches"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<BranchResponse>(
        ENDPOINT + `branch/?page=${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) =>
      getUrlParams(lastPage.previous)?.page || undefined,
    getNextPageParam: (lastPage) =>
      getUrlParams(lastPage.next)?.page || undefined,
    select: (data) => {
      const items = flatMap(data.pages, (page) => page.results);
      const count = data.pages[0]?.count;
      return {
        items,
        count,
      };
    },
  });
