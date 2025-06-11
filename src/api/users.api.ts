import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Register, Users, UsersUpdate } from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const ENDPOINT = "/accounts/users/";
const KEY = "users";

export const useUsersInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<Users>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<Users>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useUserQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Users>>(ENDPOINT + `${id}`);
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: Register) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء المندوب");
    },
  });

  return mutation;
};

export const useUpdateUser = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: UsersUpdate) => {
      const response = await api.put(ENDPOINT + `${id}/update`, formData);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث المندوب");
    },
  });
};

export const useUpdateUserIsActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      is_active,
    }: {
      id: number;
      is_active: boolean;
    }) => {
      const response = await api.patch(ENDPOINT + `${id}/update`, {
        is_active,
      });
      return response.data;
    },

    onMutate: async ({ id, is_active }) => {
      await queryClient.cancelQueries({ queryKey: [KEY] });
      const previousUsers = queryClient.getQueryData<ApiListResponse<Users>>([
        KEY,
      ]);

      queryClient.setQueryData([KEY], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(
            (page: ApiListResponse<Users>): ApiListResponse<Users> => ({
              ...page,
              data: {
                ...page.data,
                results: page.data.results.map((user: Users) => {
                  if (user.id === id) {
                    return { ...user, is_active };
                  }
                  return user;
                }),
              },
            }),
          ),
        };
      });

      return { previousUsers };
    },
    onError: (error, _user, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData([KEY], context.previousUsers);
      }
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث المندوب");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id?: number | string) => {
      const response = await api.delete(ENDPOINT + id);
      return response.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء حذف المندوب");
    },
  });

  return mutation;
};
