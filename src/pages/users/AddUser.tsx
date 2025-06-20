import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../api/users.api";
import PageLoader from "../../components/PageLoader";
import {
  userCreateSchema,
  UserCreateSchemaType,
} from "../../schemas/user.schema";
import UserForm from "./components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(userCreateSchema),
  });

  const { mutate, isPending: isLoading } = useCreateUser();

  const onSubmit = handleSubmit((formData: UserCreateSchemaType) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, val]) => [
        key,
        val === "" ? undefined : val,
      ]),
    ) as UserCreateSchemaType;

    mutate(cleanedData, {
      onSuccess: () => {
        navigate("/users");
      },
    });
  });

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <UserForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          register={register}
          errors={errors}
          control={control}
        />
      </Suspense>
    </>
  );
};

export default AddUser;
