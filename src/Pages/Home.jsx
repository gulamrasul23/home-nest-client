import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import PropertyCard from "../Components/PropertyCard";
import { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const slidePromise = fetch("http://localhost:3000/banner_slide").then((res) =>
  res.json(),
);

const Home = () => {
  const { loading } = use(AuthContext);

  const properties = useLoaderData();
  const slides = use(slidePromise);

  if (loading) {
    return (
      <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content">
      <title>HouseNest- Home</title>

      <section className="w-full pt-16 sm:h-[450px]  md:h-[596px] relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={false}
          className="mySwiper w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full overflow-hidden rounded-md ">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                  <div className="max-w-xl sm:p-8 rounded-2xl ">
                    <h1 className=" mb-1 md:mb-5 text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className=" mb-2 sm:mb-6 text-gray-100 text-4 md:text-xl drop-shadow-md">
                      {slide.description}
                    </p>
                    <div>
                      <button className="btn btn-primary sm:btn-lg border-none text-white hover:scale-105 transition-transform duration-300">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-4 sm:py-10 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-8 md:mb-12">
          <h2 className="text-3xl    font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our latest listings. These properties are handpicked for
            their exclusive locations and premium amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-6 mb-4 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-8 md:mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="py-2 text-gray-500">
              We provide the most complete, clear, and comprehensive real estate
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg text-center p-6 border border-base-200 hover:-translate-y-2 transition-transform">
              <div className="text-primary text-5xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted Listings</h3>
              <p>
                Every property is verified by our legal team to ensure a safe
                transaction.
              </p>
            </div>

            <div className="card bg-base-100 shadow-lg text-center p-6 border border-base-200 hover:-translate-y-2 transition-transform">
              <div className="text-primary text-5xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p>
                We negotiate the best deals for you, ensuring value for your
                money.
              </p>
            </div>

            <div className="card bg-base-100 shadow-lg text-center p-6 border border-base-200 hover:-translate-y-2 transition-transform">
              <div className="text-primary text-5xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Process</h3>
              <p>
                From viewing to closing, our streamlined process saves you time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content">
              Our Achievements
            </h2>
            <p className=" text-base-content/60 mt-2">
              Trusted by thousands of homeowners and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200 border-b-4 border-b-primary">
              <div className="card-body items-center text-center p-6">
                <div className="text-primary mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-base-content">
                  500+
                </div>
                <div className="text-sm font-semibold text-base-content/60 uppercase tracking-widest mt-1">
                  Properties Sold
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200 border-b-4 border-b-secondary">
              <div className="card-body items-center text-center p-6">
                <div className="text-secondary mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-base-content">
                  98%
                </div>
                <div className="text-sm font-semibold text-base-content/60 uppercase tracking-widest mt-1">
                  Satisfied Clients
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200 border-b-4 border-b-accent">
              <div className="card-body items-center text-center p-6">
                <div className="text-accent mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-base-content">
                  12+
                </div>
                <div className="text-sm font-semibold text-base-content/60 uppercase tracking-widest mt-1">
                  Years Experience
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200 border-b-4 border-b-info">
              <div className="card-body items-center text-center p-6">
                <div className="text-info mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-base-content">
                  24/7
                </div>
                <div className="text-sm font-semibold text-base-content/60 uppercase tracking-widest mt-1">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-16 px-6 md:px-12 max-w-full bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-sm text-base-content/70 mt-2">
              Find answers to common questions about our real estate services.
            </p>
          </div>

          <div className="join join-vertical w-full bg-base-100 shadow-xl border border-base-200 rounded-xl overflow-hidden">
            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-xl font-medium flex items-center gap-3">
                <span className=" bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </span>
                How do I book a viewing?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  Simply click on the "View Details" button for any property and
                  log in to schedule a visit directly through our calendar
                  system. Our agents will confirm the slot within 24 hours.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-xl font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                Do I need to be logged in to see prices?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  No, prices are visible to everyone. However, to access
                  detailed floor plans, verify property documents, and contact
                  the agent, you must create a free account and log in.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-xl font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </span>
                Are there any hidden fees?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  Transparency is our policy. All potential fees (including
                  taxes, service charges, and agent commissions) are listed
                  explicitly in the property details section before you proceed.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-xl font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                Can I list my own property here?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  Absolutely! We welcome property owners. Simply create an
                  account, go to your dashboard, and click "Add Property." Our
                  team will review your listing within 24 hours to ensure it
                  meets our quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
