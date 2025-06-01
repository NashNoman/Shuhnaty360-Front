import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiListResponse, RegisterUser, UpdateUser, User } from "../types";
import { UserCreate, UserUpdate } from "../types/users.types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";

const USERS_ENDPOINT = "/accounts/users/";

type GetUserListProps = {
  page?: number;
};

export const getUserList = async ({
  page = 1,
}: GetUserListProps): Promise<ApiListResponse<User>> => {
  const response = await api.get(USERS_ENDPOINT + `?page=${page}`);
  return response.data;
};

export const getUser = async (userId: Pick<User, "id">): Promise<User> => {
  const response = await api.get(`${USERS_ENDPOINT}${userId.id}/`);
  return response.data;
};

export const createUser = async (user: RegisterUser): Promise<RegisterUser> => {
  const response = await api.post(`${USERS_ENDPOINT}create/`, user);
  return response.data;
};

export const updateUser = async (
  userId: Pick<User, "id">,
  user: UpdateUser,
): Promise<RegisterUser> => {
  const response = await api.patch(`${USERS_ENDPOINT}${userId}/`, user);
  return response.data;
};

export const deleteUser = async (userId: Pick<User, "id">): Promise<void> => {
  await api.delete(`${USERS_ENDPOINT}${userId.id}/`);
};

export const useUsersInfinityQuery = () =>
  useInfiniteQuery({
    ...defaultInfinityQueryOptions<User>(["users"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<User>>(
        USERS_ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: UserCreate) => {
      const response = await api.post(USERS_ENDPOINT + "create/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حصل خطاء");
    },
  });

  return mutation;
};

export const useUpdateUser = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: UserUpdate) => {
      const response = await api.patch(USERS_ENDPOINT + `${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "حدث خطأ أثناء تحديث العميل");
    },
  });
};
