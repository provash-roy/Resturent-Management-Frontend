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
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <SingUp></SingUp>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contact",
        element: <ContactInfo></ContactInfo>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true,
        element: <UserHome></UserHome>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },

      {
        path: "userHome",

        element: <UserHome></UserHome>,
      },
      {
        path: "user/:email",
        element: <UserDetails></UserDetails>,
      },

      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "addItems",
        element: <AddItems></AddItems>,
      },
      {
        path: "allOrders",
        element: <AllOrders></AllOrders>,
      },
      {
        path: "customersOrder/:productName",
        element: <CustomersWhoOrdered></CustomersWhoOrdered>,
      },

      {
        path: "manageItems",
        element: <ManageItem></ManageItem>,
      },
      {
        path: "managePayment",
        element: <ManagePayment></ManagePayment>,
      },
      {
        path: "updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },

      {
        path: "myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "myorders/:email",
        element: <UserOrders></UserOrders>,
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
