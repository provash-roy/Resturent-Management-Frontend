import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMenu = () => {
  const {
    data: menu = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/menu");
      return res.data;
    },
  });
  return [menu, refetch, isLoading, error];
};

export default useMenu;
