import { use, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const property = useLoaderData();
  const { user } = use(AuthContext);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/ratings/${property._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  }, [property._id, refetch]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      ratingId: property._id,
      p_ownerEmail: property.ownerEmail,
      reviewerName: user.displayName,
      propertyName: property.propertyName,
      propertyImage: property.image,
      reviewText: reviewText,
      date: new Date().toISOString(),
      rating: rating,
    };

    fetch("http://localhost:3000/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setRefetch(!refetch);
          setRating(0);
          setReviewText("");
          Swal.fire({
            title: "Success!",
            text: "Review added successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "View Listing",
          });
        }
      });
  };

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  if (!property)
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="bg-base-100 py-16 max-w-7xl mx-auto px-6 md:px-12">
      <div className=" py-2 sm:py-4">
        <h1 className="text-3xl md:text-5xl font-extrabold sm:mb-2 sm:leading-tight">
          {property.propertyName}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-base-content/60 font-medium sm:text-lg">
          <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
            Location: {property.location}
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <div className="badge badge-secondary badge-outline p-3 font-bold">
            {property.category}
          </div>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="text-sm text-gray-400">
            Posted: {new Date(property.postedTime).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="pb-6">
        <figure className="w-full h-[200px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-md relative">
          <img
            src={property?.image}
            alt={property.propertyName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />

          <div className="absolute inset-0 to-transparent pointer-events-none"></div>
        </figure>
      </div>

      <div className=" grid grid-coll-1 lg:grid-cols-3 gap-8 sm:gap-12">
        <div className="lg:col-span-2 space-y-12  ">
          <div>
            <h3 className="text-2xl font-bold mb-4 border-b pb-2 inline-block">
              About this home
            </h3>
            <p className="text-base-content/60 text-lg leading-8 text-justify">
              {property.description}
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 ">
              {[
                "Spacious Backyard",
                "Modern Kitchen",
                "Private Parking",
                "High-Speed Wifi",
                "24/7 Security",
                "Swimming Pool",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-base-content/60"
                >
                  <span className="text-primary">✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-50 rounded-xl p-1 sm:p-8  border border-base-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg sm:text-2xl font-bold">Client Reviews</h3>
              <div className="flex items-center gap-2">
                <span className=" text-xl sm:text-3xl font-bold">
                  {averageRating || "0"}
                </span>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-xl mb-8 shadow-sm">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-md sm:text-lg font-medium text-primary">
                Write a Review
              </div>
              <div className="collapse-content">
                <form onSubmit={handleReviewSubmit} className="pt-4">
                  <div className="mb-4">
                    <span className="font-semibold mb-2 block">
                      Your Rating
                    </span>
                    <Rating
                      style={{ maxWidth: 140 }}
                      value={rating}
                      onChange={setRating}
                      isRequired
                    />
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full h-20 mb-3 focus:outline-none focus:border-primary"
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Post Review
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-2">
              {reviews.length > 0 ? (
                reviews.slice(0, 2).map((rev, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-0 pb-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content flex items-center justify-center rounded-full w-10">
                          <span className="text-lg ">
                            {rev.reviewerName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">{rev.reviewerName}</h4>
                        <p className="text-xs text-gray-400">January 2026</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <Rating
                        style={{ maxWidth: 80 }}
                        value={rev.rating}
                        readOnly
                      />
                    </div>
                    <p className="text-base-content/60 italic">
                      "{rev.reviewText}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-4">
                  No reviews yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-10 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-200 rounded-2xl overflow-hidden">
              <div className="card-body p-6">
                <p className="text-base-content/60 font-medium">
                  Property Price
                </p>
                <h2 className="text-3xl font-extrabold text-primary mb2 sm:mb-4">
                  $ {property.price.toLocaleString()}
                </h2>
                <div className="divider my-2"></div>
                <button className="btn btn-primary  w-full shadow-lg shadow-primary/30 mb-3">
                  Request a Tour
                </button>
                <button className="btn btn-outline w-full hover:bg-base-200">
                  Add to Wishlist
                </button>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar online">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-primary ring-offset-2">
                    <img
                      referrerPolicy="no-referrer"
                      src={property.ownerPhotoUrl}
                      onError={(e) => {
                        e.target.src = "/user-icon.png";
                      }}
                      alt={property.ownerName}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{property.ownerName}</h3>
                  <div className="badge badge-accent badge-outline text-xs">
                    Verified Owner
                  </div>
                </div>
              </div>

              <div className="bg-base-100 p-3 rounded-lg mb-4 text-sm text-base-content/60 break-all border border-base-200">
                ✉️ {property.ownerEmail}
              </div>

              <button className="btn btn-primary btn-block rounded-xl">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
