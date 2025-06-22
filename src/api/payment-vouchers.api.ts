import { ApiListResponse, ApiResponse } from "@/types";
import api, { classifyAxiosError } from "@/utils/api";
import { defaultInfinityQueryOptions } from "@/utils/queryOptions";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PaymentVoucherCreate,
  PaymentVoucherDetail,
  PaymentVoucherList,
} from "Api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

const ENDPOINT = "/payment-vouchers/";
const KEY = "payment-vouchers";

export const useCreatePaymentVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentVoucherCreate) => {
      return api.post(ENDPOINT + "create/", data);
    },
    onSuccess: () => {
      toast.success("تم إنشاء سند الصرف بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء سند الصرف");
    },
  });
};

export const useUpdatePaymentVoucher = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentVoucherCreate) => {
      return api.put(`${ENDPOINT}${id}/update`, data);
    },
    onSuccess: () => {
      toast.success("تم تحديث سند الصرف بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث سند الصرف");
    },
  });
};

export const usePaymentVoucher = (id: string) => {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaymentVoucherList>>(
        `${ENDPOINT}${id}`,
      );
      return response.data;
    },
  });
};

export const usePaymentVoucherQuery = (id?: string) => {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<ApiResponse<PaymentVoucherDetail>>(
        `${ENDPOINT}${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
};

export const usePaymentVouchersInfinityQuery = () => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<PaymentVoucherList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<PaymentVoucherList>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
  });

  const { isFetchingNextPage, hasNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return {
    ...query,
    ref,
    inView,
  };
};
