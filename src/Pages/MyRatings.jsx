import { use, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const MyRatings = () => {
  const { user } = use(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://home-nest-server.vercel.app/ratings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
        });
    }
  }, [user?.email]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={`${
              index < rating ? "text-warning fill-warning" : "text-base-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-base-content/70">
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200 py-18 px-4 sm:px-6 lg:px-16">
      <title>HomeNest- My Ratings</title>
      <div className="max-w-7xl  mx-auto">
        <h1 className="text-3xl font-extrabold mb-4 text-center sm:text-left text-base-content">
          My Ratings
        </h1>

        {reviews.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-base-100 rounded-xl border border-base-300 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row"
              >
                <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
                  <img
                    src={review.propertyImage}
                    alt={review.propertyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h2 className="text-lg font-bold text-base-content hover:text-primary transition cursor-pointer">
                        {review.propertyName}
                      </h2>

                      <span className="text-sm text-base-content/60 hidden sm:block">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mb-3">{renderStars(review.rating)}</div>

                    <p className="text-base-content/80 text-sm leading-relaxed mb-4">
                      "{review.reviewText}"
                    </p>
                  </div>

                  <div className="flex items-center pt-4 border-t border-base-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-base-content">
                          {review.reviewerName}
                        </span>
                        <span className="text-xs text-base-content/50 sm:hidden">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            <h3 className="text-2xl font-bold">No Review Found</h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-sm text-center">
              It looks like you haven't any review yet. Add your beautiful
              property to start receiving inquiries and good review.
            </p>
            <Link to="/" className="btn btn-primary px-8">
              Go Back
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;
