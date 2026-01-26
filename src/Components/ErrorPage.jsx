import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center px-6 py-[40px]">
      <div className="w-[70%]">
        <img src="/image/error-404.png" />
      </div>
      <div className="pt-4">
        <h1 className=" text-3xl md:text-[48px] font-bold text-primary text-center pb-1 sm:pb-4">
          Oops, page not found!
        </h1>
        <p className="text-lg md:text-[20px] text-secondary text-center pb-6 sm:pb-[40px]">
          The page you are looking for is not available.
        </p>
        <div className="text-center">
          <Link
            to="/"
            className="btn px-8 bg-gradient-to-br from-[#632EE3] to-[#9F62F2] text-white font-semibold"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
