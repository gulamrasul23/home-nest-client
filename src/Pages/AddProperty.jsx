import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const AddProperty = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleAddProperty = async (e) => {
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
    const postedTime = new Date().toISOString();

    const newProperty = {
      propertyName,
      category,
      description,
      location,
      price,
      image,
      postedTime,
      ownerName,
      ownerEmail,
      ownerPhotoUrl,
    };

    await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Property added successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "View Listing",
          });
        }
        e.target.reset();
      });
    navigate("/allProperties");
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center pt-16 sm:px-16">
      <title>HomeNest- Add Property</title>
      <div className="w-full max-w-screen-xl bg-base-100 rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-base-300">
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-primary via-blue-600 to-secondary text-white">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Start Your Journey <br /> With Us
            </h2>
            <p className="text-white/80 text-lg">
              "Real estate cannot be lost or stolen, nor can it be carried away.
              Purchased with common sense, paid for in full, and managed with
              reasonable care, it is about the safest investment in the world."
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 mb-10">
            <div className="avatar">
              <div className="w-14 rounded-full border-2 border-white shadow-lg">
                <img src={user.photoURL} alt="User" />
              </div>
            </div>
            <div>
              <p className="text-white/70 font-bold tracking-wider mb-1">
                Logged in as
              </p>
              <h3 className="text-white font-bold text-xl">
                {user.displayName}
              </h3>
              <p className="text-white/80 text-sm opacity-90">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 md:p-14 lg:p-16 bg-base-100 text-base-content w-full">
          <div className="lg:hidden flex items-center gap-4 mb-8 bg-base-200 p-4 rounded-xl border border-base-300">
            <img
              src={user?.photoURL}
              onError={(e) => {
                e.target.src = "/user-icon.png";
              }}
              className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              alt=""
            />
            <div className="overflow-hidden">
              <p className="text-base font-bold truncate">{user.displayName}</p>
              <p className="text-xs text-base-content/60 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
              Add New Property
            </h2>
            <p className="text-base-content/60">
              Fill out the details below to publish your listing.
            </p>
          </div>

          <form
            onSubmit={handleAddProperty}
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
                className="textarea textarea-bordered h-32 w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all text-base leading-relaxed"
                placeholder="Write a detailed description regarding the property features..."
                required
              ></textarea>
            </div>
            <div className="form-control md:col-span-2 mt-4">
              <button className="btn btn-primary w-full btn-lg text-lg rounded-xl shadow-lg hover:shadow-primary/40 transition-transform transform hover:-translate-y-1">
                Add Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
