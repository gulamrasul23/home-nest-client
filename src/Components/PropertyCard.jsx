import { Link } from "react-router";

const PropertyCard = ({ property }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-lg font-bold">
            {property.propertyName}
          </h2>
          <div className="badge badge-secondary font-semibold shrink-0">
            {property.category}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
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
          </svg>{" "}
          {property.location}
        </p>

        <p className="text-gray-600 line-clamp-3 mb-4">
          {property.description}
        </p>

        <div className="divider my-0"></div>

        <div className="card-actions justify-between items-center mt-2">
          <span className="text-xl font-bold text-primary">
            $ {property.price}
          </span>
          <Link
            to={`/propertyDetails/${property._id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
