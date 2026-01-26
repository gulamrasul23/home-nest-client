import React, { use } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const UpdateProperty = ({ selectedProperty, setIsModalOpen }) => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const ownerName = e.target.name.value;
    const ownerEmail = e.target.email.value;
    const ownerPhotoUrl = user.photoURL;
    const propertyName = e.target.propertyName.value;
    const location = e.target.location.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const image = e.target.image.value;
    const description = e.target.description.value;

    const updatedData = {
      propertyName,
      category,
      description,
      location,
      price,
      image,
      ownerName,
      ownerEmail,
      ownerPhotoUrl,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/properties/${selectedProperty._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Property updated successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          setIsModalOpen(false);
          navigate(`/propertyDetails/${selectedProperty._id}`);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 overflow-y-auto">
      <title>HomeNest- Update Property</title>
      <div className="bg-base-100 w-[300px] sm:w-full sm:max-w-2xl rounded-2xl shadow-2xl relative  overflow-hidden max-h-[90vh] md:max-h-auto ">
        <button
          onClick={() => setIsModalOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20 bg-base-100/50 hover:bg-red-500 hover:text-white"
        >
          ✕
        </button>
        <div className="w-full p-8 overflow-y-auto max-h-[85vh]">
          <h2 className="text-2xl font-bold mb-1">Update Property</h2>
          <p className="text-sm text-gray-500 mb-6">
            Update the details below to modify your listing.
          </p>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={user.displayName}
                className="input w-full bg-base-200"
                required
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Email
                </span>
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                className="input  w-full bg-base-200"
                readOnly
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Property Title
                </span>
              </label>
              <input
                type="text"
                name="propertyName"
                placeholder="e.g. Modern Apartment in City Center"
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. New York, USA"
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Price ($)
                </span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 250000"
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Category
                </span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
              >
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Image URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://..."
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                required
              />
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-base-content/60 font-bold">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered h-32 w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all sm:text-base leading-relaxed"
                placeholder="Write a detailed description regarding the property features..."
                required
              ></textarea>
            </div>
            <div className="form-control md:col-span-2 mt-4">
              <div className=" sm:modal-action mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary sm:px-8 text-md sm:text-lg hover:shadow-primary/40 transition-transform transform hover:-translate-y-1"
                >
                  Update Property
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
