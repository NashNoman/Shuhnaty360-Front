import { useSuspenseQuery } from "@tanstack/react-query";
import { CompanyBranchOption } from "../../Api";
import { ApiListResponse } from "../types";
import api from "../utils/api";

const ENDPOINT = "/profile/";

type BranchResponse = ApiListResponse<CompanyBranchOption>;

export const useCompanyBranchesOptions = () =>
  useSuspenseQuery({
    queryKey: ["profiles", "branches"],
    queryFn: async () => {
      const response = await api.get<BranchResponse>(
        ENDPOINT + `companies/options/`,
      );
      return response.data;
    },
  });
