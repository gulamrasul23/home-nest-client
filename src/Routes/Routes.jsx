import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import ResetPassword from "../Pages/ResetPassword";
import AllProperties from "../Pages/AllProperties";
import MyProperties from "../Pages/MyProperties";
import MyRatings from "../Pages/MyRatings";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/ErrorPage";
import PropertyDetails from "../Pages/PropertyDetails";
import AddProperty from "../Pages/AddProperty";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: async () => {
          const res = await fetch("http://localhost:3000/properties?limit=6");
          return res.json();
        },
        hydrateFallbackElement: (
          <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ),
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: "signIn",
        Component: SignIn,
      },
      {
        path: "reset",
        Component: ResetPassword,
      },
      {
        path: "allProperties",
        element: <AllProperties></AllProperties>,
        loader: async () => {
          const res = await fetch("http://localhost:3000/properties");
          return res.json();
        },
        hydrateFallbackElement: (
          <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ),
      },
      {
        path: "myProperties",
        element: (
          <PrivateRoute>
            <MyProperties></MyProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProperty/:id",
        element: (
          <PrivateRoute>
            <MyProperties></MyProperties>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:3000/properties/${params.id}`,
          );
          return res.json();
        },
        hydrateFallbackElement: (
          <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ),
      },
      {
        path: "myRating",
        element: (
          <PrivateRoute>
            <MyRatings></MyRatings>
          </PrivateRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:3000/properties/${params.id}`,
          );
          return res.json();
        },
        hydrateFallbackElement: (
          <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default router;
