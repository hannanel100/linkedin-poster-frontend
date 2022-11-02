import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAccessTokenQuery = (code: string | undefined) => {
  const queryClient = useQueryClient();
  const accessTokenQuery = useQuery(
    ["accessToken"],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/auth/accessToken/${code}`
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
  return { accessTokenQuery, accessToken: accessTokenQuery.data };
};
