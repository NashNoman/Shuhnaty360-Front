import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../utils/api";

export function useFetch<T>(
  queryKey: QueryKey,
  url: string,
  params?: Record<string, any>,
  enabled = true
) {
  return useQuery<T>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const res = await api.get(url, { params });
      return res.data;
    },
    enabled,
  });
}

export function useCreate<TData = any, TVariables = any>(
  url: string,
  invalidateKey?: QueryKey
) {
  const queryClient = useQueryClient();
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data) => api.post(url, data),
    onSuccess: () => {
      if (invalidateKey)
        queryClient.invalidateQueries({ queryKey: invalidateKey });
    },
  });
}

export function useUpdate<TData = any, TVariables = any>(
  url: string,
  invalidateKey?: QueryKey
) {
  const queryClient = useQueryClient();
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data) => api.patch(url, data),
    onSuccess: () => {
      if (invalidateKey)
        queryClient.invalidateQueries({ queryKey: invalidateKey });
    },
  });
}

export function useDelete<TData = any>(url: string, invalidateKey?: QueryKey) {
  const queryClient = useQueryClient();
  return useMutation<TData, unknown, void>({
    mutationFn: () => api.delete(url),
    onSuccess: () => {
      if (invalidateKey)
        queryClient.invalidateQueries({ queryKey: invalidateKey });
    },
  });
}
