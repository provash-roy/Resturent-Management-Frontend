import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AddItems from "../Pages/Dashboard/AddItems";
import ManageItem from "../Pages/Dashboard/ManageItem";
import UpdateItem from "../Pages/Dashboard/updateItem";
import AllOrders from "../Pages/Dashboard/AllOrders";
import ManagePayment from "../Pages/Dashboard/ManagePayment";
import MyOrders from "../Pages/Dashboard/MyOrders";
import AdminHome from "../Pages/Dashboard/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome";
import CustomersWhoOrdered from "../Pages/Dashboard/CustomersWhoOrdered";
import UserOrders from "../Pages/Dashboard/UserOrders";
import Profile from "../Pages/Dashboard/Profile";
import ContactInfo from "../Pages/Dashboard/ContactInfo";
import UserDetails from "../Pages/Dashboard/UserDetails";
import DashboardRedirect from "./components/DashboardRedirect";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SingUp />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contact",
        element: <ContactInfo />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      {
        path: "userHome",

        element: <UserHome />,
      },

      {
        path: "user/:email",
        element: <UserDetails />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "addItems",
        element: <AddItems />,
      },
      {
        path: "allOrders",
        element: <AllOrders />,
      },
      {
        path: "customersOrder/:productName",
        element: <CustomersWhoOrdered />,
      },

      {
        path: "manageItems",
        element: <ManageItem />,
      },
      {
        path: "managePayment",
        element: <ManagePayment />,
      },
      {
        path: "updateItem/:id",
        element: <UpdateItem />,
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      {
        path: "myorders",
        element: <MyOrders />,
      },
      {
        path: "myorders/:email",
        element: <UserOrders />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
    ],
  },
]);
