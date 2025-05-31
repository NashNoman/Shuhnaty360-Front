import { ApiListResponse, RegisterUser, UpdateUser, User } from "../types";
import api from "../utils/api";

const usersEndpoint = "/accounts/users/";

type GetUserListProps = {
  page?: number;
};

export const getUserList = async ({
  page = 1,
}: GetUserListProps): Promise<ApiListResponse<User>> => {
  const response = await api.get(usersEndpoint + `?page=${page}`);
  return response.data;
};

export const getUser = async (userId: Pick<User, "id">): Promise<User> => {
  const response = await api.get(`${usersEndpoint}${userId.id}/`);
  return response.data;
};

export const createUser = async (user: RegisterUser): Promise<RegisterUser> => {
  const response = await api.post(`${usersEndpoint}create/`, user);
  return response.data;
};

export const updateUser = async (
  userId: Pick<User, "id">,
  user: UpdateUser,
): Promise<RegisterUser> => {
  const response = await api.patch(`${usersEndpoint}${userId}/`, user);
  return response.data;
};

export const deleteUser = async (userId: Pick<User, "id">): Promise<void> => {
  await api.delete(`${usersEndpoint}${userId.id}/`);
};
