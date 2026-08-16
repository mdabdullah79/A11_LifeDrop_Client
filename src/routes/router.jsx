import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Home/Login";
import Register from "../Pages/Home/Register";
import Dashboard from "../Pages/Home/Dashboard";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import Profile from "../Pages/Home/Profile";
import CreateDonationRequest from "../Pages/Home/CreateDonationRequest";
import AllUsers from "../Pages/Home/AllUsers";
import AllBloodDonationRequests from "../Pages/Home/ AllBloodDonationRequests";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Pages/Home/ErrorPage";
import MyDonationRequests from "../Pages/Home/MyDonationRequests";
import SearchDonors from "../Pages/Home/SearchDonors";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/search_donors",
        Component:SearchDonors,
      }
    ],
  },
  {
    path: "/",
    Componet: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,

        loader: async () => {
          const response = await fetch("/Location.json");

          if (!response.ok) {
            throw new Error("Failed to load location data");
          }

          const data = await response.json();

          return data;
        },
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "/dashboard/all-users",
        //Component:AllUsers
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: "/dashboard/blood-requests",
        Component: AllBloodDonationRequests,
      },
      {
        path:"/dashboard/my-donation-requests",
        Component:MyDonationRequests,

      }
    ],
  },
]);
