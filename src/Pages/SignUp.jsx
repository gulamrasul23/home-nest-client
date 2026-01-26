import { Eye, EyeOff } from "lucide-react";
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const { createUser, signGoogle } = use(AuthContext);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const emailId = e.target.email.value;
    const passwordId = e.target.password.value;
    const terms = e.target.terms.checked;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(passwordId)) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: "❌ Invalid password! It must contain: At least 6 characters, One uppercase letter, One lowercase letter.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    if (!terms) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: "Please accept our terms and conditions.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    createUser(emailId, passwordId)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {})
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
    e.target.reset();
    Swal.fire({
      title: "Success..!",
      text: "Sign Up successfully!",
      icon: "success",
      confirmButtonText: "Okay",
    });
    navigate("/");
  };

  const handleGooglePop = () => {
    signGoogle()
      .then(() => {
        Swal.fire({
          title: "Success..!",
          text: "Sign In successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  const handleToggleShow = (e) => {
    e.preventDefault();
    setEye(!eye);
  };

  return (
    <div className="p-16 flex flex-col justify-center items-center">
      <title>HouseNest- Sign Up</title>
      <div className="md:w-[320px]">
        <form onSubmit={handleSignUp} className="my-4">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[280px] sm:w-xs border p-4">
            <div className="flex justify-center items-center">
              <h1 className="text-[24px] font-semibold">Sign Up</h1>
            </div>

            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
              required
            />

            <label className="label">Photo</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo-URL"
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <button
                onClick={handleToggleShow}
                className=" cursor-pointer absolute right-4 top-3 border-none bg-transparent"
              >
                {eye ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className=" text-[14px]">
                Please accept our terms and conditions.
              </span>
            </div>

            <button className="btn btn-primary mt-4">Sign Up</button>

            <p className=" text-[13px] sm:text-[14px]">
              Already have an account? Please{" "}
              <Link
                to="/signIn"
                className="text-blue-500 underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </fieldset>
        </form>
        <button
          onClick={handleGooglePop}
          className="btn bg-white text-black border-[#e5e5e5] mb-2 w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
