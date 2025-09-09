import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { axiosSecure } from "./useAxiosSecure";

const useAdmin = () => {
  console.log("Start")
  const { user } = useContext(AuthContext);
  const { data: isAdmin,isLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data.admin)
      return res.data?.admin;
    },
  });
  console.log("end")
  return [isAdmin,isLoading];
};

export default useAdmin;
