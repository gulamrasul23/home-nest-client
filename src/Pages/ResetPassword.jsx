import { use, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const ResetPassword = () => {
  const location = useLocation();
  const { resetPassword } = use(AuthContext);
  const [email, setEmail] = useState(() => location.state?.email || "");

  const handleForget = (e) => {
    e.preventDefault();

    resetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Reset Password..!",
          text: "Please Check your email inbox and reset your Password",
          icon: "info",
          confirmButtonText: "Okay",
        });
        setEmail("");
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

  return (
    <div className="max-w-11/12 min-h-[calc(100vh-285px)] pt-18 flex justify-center items-center mx-auto">
      <title>HomeNest- Reset Password</title>
      <form onSubmit={handleForget}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[280px] sm:w-xs border p-4">
          <div className="flex justify-center items-center">
            <h1 className="text-[24px] font-semibold">Reset Password</h1>
          </div>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
            placeholder="Email"
            required
          />

          <button className="btn btn-neutral mt-4">Reset</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ResetPassword;
