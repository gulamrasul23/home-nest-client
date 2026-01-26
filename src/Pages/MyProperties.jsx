import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import UpdateProperty from "./UpdateProperty";

const MyProperties = () => {
  const { user } = use(AuthContext);

  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/properties?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProperties(data);
        });
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Property?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4b4b",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remaining = properties.filter(
                (property) => property._id !== id,
              );
              setProperties(remaining);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  if (!properties)
    return (
      <div className="min-h-screen pt-16 flex justify-center items-center bg-base-200">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 font-sans pb-20">
      <title>HomeNest- My Properties</title>

      <div className="bg-primary text-primary-content pt-20 pb-20 px-4 md:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="avatar online">
              <div className="w-16 md:w-20 rounded-full ring ring-primary-content ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL}
                  onError={(e) => {
                    e.target.src = "/user-icon.png";
                  }}
                  referrerPolicy="no-referrer"
                  alt="User"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                Hello, {user.displayName.split(" ")[0]}!
              </h1>
              <p className="opacity-90 text-sm md:text-base">
                Manage your properties and view statistics.
              </p>
            </div>
          </div>
          <Link
            to="/addProperty"
            className="btn btn-secondary btn-wide shadow-lg hover:scale-105 transition-transform rounded-full font-bold"
          >
            + Add New Property
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-16 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="stat bg-base-100 shadow-lg rounded-2xl border-l-4 border-primary">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-semibold">Total Listings</div>
            <div className="stat-value text-primary">{properties.length}</div>
            <div className="stat-desc">Added this month</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl border-l-4 border-secondary">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-semibold">Total Value</div>
            <div className="stat-value text-secondary">$2.1M</div>
            <div className="stat-desc">↗︎ 14% more than last month</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl border-l-4 border-accent">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-semibold">Avg. Rating</div>
            <div className="stat-value text-accent">0</div>
            <div className="stat-desc">From 00 reviews</div>
          </div>
        </div>

        {properties.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3">
              My Listings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="card bg-base-100 shadow-xl border border-base-200 group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <figure className="relative h-60 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.propertyName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-4 left-4 badge badge-primary font-medium shadow-sm">
                      {property.category}
                    </div>

                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs opacity-90 font-light">Price</p>
                      <p className="text-xl font-bold tracking-wide">
                        $ {property.price.toLocaleString()}
                      </p>
                    </div>
                  </figure>

                  <div className="card-body p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2
                        className="card-title text-lg font-bold truncate pr-2"
                        title={property.propertyName}
                      >
                        {property.propertyName}
                      </h2>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 flex items-center gap-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {property.location}
                      </p>
                      <div className="flex items-center gap-1 px-2  rounded text-xs font-bold text-yellow-700">
                        {new Date(property.postedTime).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="h-[1px] bg-base-200 w-full my-1"></div>

                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Link
                        to={`/propertyDetails/${property._id}`}
                        className="btn btn-sm btn-ghost hover:bg-base-200 text-gray-600 flex flex-col gap-0 h-auto py-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          View
                        </span>
                      </Link>

                      <button
                        onClick={() => openModal(property)}
                        className="btn btn-sm btn-ghost hover:bg-blue-50 text-blue-600 flex flex-col gap-0 h-auto py-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          Edit
                        </span>
                      </button>

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-sm btn-ghost hover:bg-red-50 text-red-500 flex flex-col gap-0 h-auto py-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
            <div className="bg-base-200 p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700">
              No Properties Found
            </h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-sm text-center">
              It looks like you haven't listed any properties yet. Add your
              first property to start receiving inquiries.
            </p>
            <Link to="/addProperty" className="btn btn-primary px-8">
              Create Listing
            </Link>
          </div>
        )}
      </div>
      {isModalOpen && (
        <UpdateProperty
          selectedProperty={selectedProperty}
          setIsModalOpen={setIsModalOpen}
        ></UpdateProperty>
      )}
    </div>
  );
};

export default MyProperties;
