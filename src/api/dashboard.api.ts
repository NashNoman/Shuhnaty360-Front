import { DashboardData } from "@/types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const KEY = "dashboard";
const ENDPOINT = "/dashboard/shipment-report/";

export const useDashboardQuery = () =>
  useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const response = await api.get<DashboardData>(ENDPOINT);
      return response.data;
    },
  });
