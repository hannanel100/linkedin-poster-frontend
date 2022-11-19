import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "./useUserQuery";

const fetchPosts = async (userId: string | undefined) => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
    params: { userId: userId },
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const usePostQuery = () => {
  const queryClient = useQueryClient();
  const { user } = useUserQuery();
  const postQuery = useQuery(
    ["posts"],
    async () => {
      const data = await fetchPosts(user?.id);
      return data;
    },
    {
      enabled: !!user?.id,
      onSuccess: (data) => {
        queryClient.setQueryData(["posts"], data);
      },
    }
  );
  return { postQuery, posts: postQuery.data };
};
