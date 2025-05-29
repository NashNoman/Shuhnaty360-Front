// import { QueryKey } from "@tanstack/react-query";
// import { useFetch } from "./useApi";
// import { useSearchParams } from "react-router-dom";

// type TablePaginateProps = {
//   queryKey: QueryKey;
//   endpoint: string;
//   params?: Record<string, any>;
//   enabled?: boolean;
//   pageSize?: number;
//   currentPage?: number;
// }

// function useTablePaginate({
//   queryKey,
//   endpoint,
//   enabled = true,
//   pageSize = 10,
//   currentPage = 1,
// }: TablePaginateProps) {
//     const [params, setParams] = useSearchParams();
//     const

//   const {data, isLoading, isError, error} = useFetch(
//     queryKey,
//     endpoint,
//     params,
//     enabled
//   );
// }

// export default useTablePaginate;
