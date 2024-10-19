import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home/Home";
import PopularSpots from "../Components/Home/PopularSpots/PopularSpots";
import Contact from "../Components/Contact/Contact";
import SignUp from "../Pages/Auth/Signup/SignUp";
import Signin from "../Pages/Auth/Signin/Signin";
import DetailsPage from "../Pages/Details/DetailsPage";
import DashLayout from "../Dashboard/DashLayout";
import AllUser from "../Dashboard/AllUser";
import AllDestination from "../Dashboard/AllDestination";
import CreateDestination from "../Dashboard/CreateDestination";
import UpdateDestination from "../Dashboard/UpdateDestination";
import AllLocation from "../Dashboard/AllLocation";
import CreateLocation from "../Dashboard/CreateLocation";
import Booking from "../Pages/Booking/Booking";
import Payment from "../Pages/Payment/Payment";
import AllBooking from "../Dashboard/AllBooking";
import Profile from "../Components/Components/Profile/Profile";
import TermsOfService from "../Pages/Terms/Terms";
import PrivacyPolicy from "../Pages/Privacy/Privacy";
import BookingDetails from "../Pages/BookingDetails";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import UpdateLocation from "../Dashboard/UpdateLocation";
import UserBookings from "../Components/UserBookings/UserBookings";
import Cart from "../Components/Cart/Cart";
import Wishlist from "../Components/Wishlist/Wishlist";
import ChangePassword from "../Components/ChangePassword/ChangePassword";
import SingleBookingDetails from "../Pages/SignleBookingDetails/SingleBookingDetails";
import UserSingleBooking from "../Dashboard/UserSingleBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destination",
        element: <PopularSpots />,
      },
      {
        path: "/destination/:spotid",
        element: <PopularSpots />,
      },
      {
        path: "/details/:id",
        element: <DetailsPage />,
      },
      {
        path: "/singleBookingDetails/:id",
        element: <PrivateRoute><SingleBookingDetails /></PrivateRoute> ,
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword/>,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/userbookings",
        element: <UserBookings />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/bookingDetails",
        element: <BookingDetails />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AdminPrivateRoute>
        <DashLayout />
      </AdminPrivateRoute>
    ),
    children: [
      {
        path: "alluser",
        element: (
          <AdminPrivateRoute>
            <AllUser />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <AdminPrivateRoute>
            <AllBooking />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "booking/:id",
        element: (
          <AdminPrivateRoute>
            <UserSingleBooking />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "alldestination",
        element: (
          <AdminPrivateRoute>
            <AllDestination />{" "}
          </AdminPrivateRoute>
        ),
      },
      {
        path: "createdestination",
        element: (
          <AdminPrivateRoute>
            <CreateDestination />{" "}
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allocation",
        element: (
          <AdminPrivateRoute>
            <AllLocation />{" "}
          </AdminPrivateRoute>
        ),
      },
      {
        path: "createlocation",
        element: (
          <AdminPrivateRoute>
            <CreateLocation />
          </AdminPrivateRoute>
        ),
      },

      {
        path: "updatedestination/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateDestination />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "updatelocation/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateLocation />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);
