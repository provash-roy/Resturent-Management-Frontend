import { FaEdit } from "react-icons/fa";
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menu = [], refetch] = useMenu();

  const axiosSecure = useAxiosSecure();

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
          const res = await axiosSecure.delete(`/menu/${id}`);
          if (res.data.deletedCount > 0) {
            swal(
              "Deleted!",
              "The Item has been removed from your List.",
              "success"
            );
            refetch();
          }
        } catch (error) {
          swal("Error!", "Failed to delete item.", { error });
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={"Manage All Items"}
        subHeading={"Hurry Up"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn btn-lg bg-amber-800 text-white-600">
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default ManageItem;
