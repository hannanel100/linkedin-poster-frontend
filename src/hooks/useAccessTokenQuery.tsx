import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAccessTokenQuery = (code: string | undefined) => {
  const queryClient = useQueryClient();
  const accessTokenQuery = useQuery(
    ["accessToken"],
    async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/accessToken/${code}`
      );
      return data;
    },
    {
      enabled: !!code,
      onSuccess: (data) => {
        queryClient.setQueryData(["accessToken"], data);
      },
    }
  );
  // // const tokenIntrospectQuery = useQuery(
  // //   ["tokenIntrospect"],
  // //   async () => {
  // //     const { data } = await axios.get(
  // //       `${import.meta.env.VITE_BACKEND_URL}/api/auth/accessToken/introspect/${accessTokenQuery.data?.access_token}`
  // //     );
  // //     return data;
  // //   },
  // //   {
  // //     enabled: !!accessTokenQuery.data?.access_token,
  // //     onSuccess: (data) => {
  // //       queryClient.setQueryData(["tokenIntrospect"], data);
  // //     },
  // //   }
  // );
  return {
    accessTokenQuery,
    accessToken: accessTokenQuery.data,
    // tokenIntrospectQuery,
    // tokenIntrospect: tokenIntrospectQuery.data,
  };
};
