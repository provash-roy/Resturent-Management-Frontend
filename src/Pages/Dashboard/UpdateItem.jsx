import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa6";

const UpdateItem = () => {
  const item = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const image_hosting_key = import.meta.env.VITE_imgBB_api_key;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.Image[0] };
      const imgRes = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgRes.data.success) {
        const imageUrl = imgRes.data.data.display_url;

        const newItem = {
          name: data.Name,
          recipe: data.Details,
          image: imageUrl,
          category: data.Category,
          price: parseFloat(data.Price),
        };

        const res = await axiosPublic.patch(`/menu/${item._id}`, newItem);

        if (res.data) {
          alert("Item Updated successfully!");
          console.log("item Updated succesfully");
          reset();
        }
      }
    } catch (error) {
      console.error("Error Updaiting item:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"Update An Item"}
        subHeading={"Refresh Item"}
      ></SectionTitle>

      <div className="bg-orange-50 min-h-screen p-8">
        <h3 className="  text-3xl font-bold text-center text-orange-600 mb-8">
          Add New Recipe
        </h3>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-orange-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Recipe Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-orange-600 font-semibold">
                Recipe Name*
              </legend>
              <input
                {...register("Name", { required: true })}
                defaultValue={item.name}
                type="text"
                className="input input-bordered w-full border-orange-300 focus:border-orange-500"
                placeholder="Enter Recipe Name"
              />
            </fieldset>

            {/* Category & Price */}
            <div className="flex gap-6">
              <div className="w-1/2">
                <legend className="fieldset-legend text-orange-600 font-semibold">
                  Category*
                </legend>
                <select
                  {...register("Category", { required: true })}
                  defaultValue={item?.category}
                  className="select select-bordered w-full border-orange-300 focus:border-orange-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soups">Soups</option>
                  <option value="drink">Drinks</option>
                </select>
              </div>
              <div className="w-1/2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-orange-600 font-semibold">
                    Price*
                  </legend>
                  <input
                    {...register("Price", { required: true })}
                    defaultValue={item?.price}
                    type="number"
                    className="input input-bordered w-full border-orange-300 focus:border-orange-500"
                    placeholder="Enter Price"
                  />
                </fieldset>
              </div>
            </div>

            {/* Recipe Details */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-orange-600 font-semibold">
                Recipe Details*
              </legend>
              <textarea
                {...register("Details", { required: true })}
                defaultValue={item.recipe}
                className="textarea textarea-bordered h-24 w-full border-orange-300 focus:border-orange-500"
                placeholder="Enter Recipe Details"
              ></textarea>
            </fieldset>

            {/* File Upload */}
            <div>
              <input
                type="file"
                {...register("Image", { required: true })}
                className="file-input file-input-bordered file-input-warning"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn bg-orange-500 hover:bg-orange-600 text-white px-6"
              >
                Update Item <FaUtensils className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
