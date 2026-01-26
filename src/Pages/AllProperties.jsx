import { useState } from "react";
import AllPropertyCard from "../Components/AllPropertyCard";
import { useLoaderData } from "react-router";

const AllProperties = () => {
  const properties = useLoaderData();

  const [sortOrder, setSortOrder] = useState("none");

  const sortItems = (() => {
    if (sortOrder === "price-low") {
      return [...properties].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      return [...properties].sort((a, b) => b.price - a.price);
    } else {
      return properties;
    }
  })();

  return (
    <div className=" pt-2 sm:pt-4 bg-base-200">
      <title>HomeNest- All Properties</title>
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            All Properties
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our latest listings. These properties are handpicked for
            their exclusive locations and premium amenities.
          </p>
        </div>

        <div className="pb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select w-[145px] border-2 font-medium cursor-pointer outline-none"
          >
            <option value="none" disabled={true}>
              Sort By Price
            </option>
            <option value="price-low">Low-High</option>
            <option value="price-high">High-Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortItems.map((property) => (
            <AllPropertyCard
              key={property._id}
              property={property}
            ></AllPropertyCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProperties;
