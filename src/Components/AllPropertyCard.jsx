import { Link } from "react-router";

const AllPropertyCard = ({ property }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
      <figure className="relative h-56">
        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 badge badge-secondary font-semibold">
          {property.category}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{property.propertyName}</h2>
        <p className="text-sm text-base-content/60 mb-2 flex items-center gap-1">
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
        <p className="text-base-content/60 line-clamp-2 mb-2">
          {property.description}
        </p>

        <div className="mt-1">
          <p className="text-xs text-gray-400">
            Posted by:{" "}
            <span className="font-semibold text-base-content/60">
              {property.ownerName}
            </span>
          </p>
        </div>

        <div className="card-actions justify-between items-center mt-2 border-t pt-4 border-base-200">
          <span className="text-xl font-bold text-primary">
            $ {property.price}
          </span>

          <Link
            to={`/propertyDetails/${property._id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPropertyCard;
