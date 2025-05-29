import {
  ApiListResponse,
  Driver,
  RegisterUser,
  UpdateUser,
  User,
} from "../types";
import api from "../utils/api";

const driverEndpoint = "/drivers/";

export const getDriverList = async (): Promise<ApiListResponse<Driver>> => {
  const response = await api.get(driverEndpoint);
  return response.data;
};

export const getDriver = async (userId: Pick<User, "id">): Promise<User> => {
  const response = await api.get(`${driverEndpoint}${userId.id}/`);
  return response.data;
};

export const createDriver = async (
  user: RegisterUser,
): Promise<RegisterUser> => {
  const response = await api.post(`${driverEndpoint}create/`, user);
  return response.data;
};

export const updateDriver = async (
  userId: Pick<User, "id">,
  user: UpdateUser,
): Promise<RegisterUser> => {
  const response = await api.patch(`${driverEndpoint}${userId}/`, user);
  return response.data;
};

export const deleteDriver = async (userId: Pick<User, "id">): Promise<void> => {
  await api.delete(`${driverEndpoint}${userId.id}/`);
};
