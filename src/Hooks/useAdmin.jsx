import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { axiosSecure } from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin];
};

export default useAdmin;
