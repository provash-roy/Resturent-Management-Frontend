import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUsers } from "react-icons/fa6";
import swal from "sweetalert";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
    enabled: true,
    keepPreviousData: false,
  });

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/admin/${id}`);
      if (res.data.modifiedCount > 0) {
        swal("Success!", "User is now an Admin.", "success");
        refetch();
      }
    } catch (error) {
      swal("Error!", "Failed to make admin.", "error");
    }
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axios.delete(`http://localhost:5000/users/${id}`);
          if (res.data.deletedCount > 0) {
            swal(
              "Deleted!",
              "The User has been removed from your List.",
              "success"
            );
            refetch();
          }
        } catch (error) {
          swal("Error!", "Failed to delete item.", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-around text-4xl my-4">
        <h2>All Users : {users.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-lg bg-amber-800 text-white-600"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
