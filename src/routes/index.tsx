import AddPaymentVoucher from "@/pages/payment-vouchers/AddPaymentVoucher";
import EditPaymentVoucher from "@/pages/payment-vouchers/EditPaymentVoucher";
import PaymentVoucherDetails from "@/pages/payment-vouchers/PaymentVoucherDetails";
import PaymentVouchers from "@/pages/payment-vouchers/PaymentVouchers";
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Layout from "../Layout";
import { AuthProvider } from "../context/AuthContext";
import DashboardPage from "../pages/Dashboard";
import Login from "../pages/Login";
import AlertMessages from "../pages/alertMessages/AlertMessages";
import SelectRecipients from "../pages/alertMessages/SelectRecipients";
import AddClient from "../pages/clients/AddClient";
import ClientDetails from "../pages/clients/ClientDetails";
import Clients from "../pages/clients/Clients";
import DeleteClient from "../pages/clients/DeleteClient";
import EditClient from "../pages/clients/EditClient";
import AddDriver from "../pages/drivers/AddDriver";
import DeleteDriver from "../pages/drivers/DeleteDriver";
import DriverDetails from "../pages/drivers/DriverDetails";
import Drivers from "../pages/drivers/Drivers";
import EditDriver from "../pages/drivers/EditDriver";
import AddRecipient from "../pages/recipient/AddRecipient";
import DeleteRecipient from "../pages/recipient/DeleteRecipient";
import EditRecipient from "../pages/recipient/EditRecipient";
import RecipientDetails from "../pages/recipient/RecipientDetails";
import Recipients from "../pages/recipient/Recipients";
import AddShipment from "../pages/shipments/AddShipment";
import DeleteShipment from "../pages/shipments/DeleteShipment";
import EditShipment from "../pages/shipments/EditShipment";
import ShipmentDetails from "../pages/shipments/ShipmentDetails";
import Shipments from "../pages/shipments/Shipments";
import AddUser from "../pages/users/AddUser";
import DeleteUser from "../pages/users/DeleteUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";
import Users from "../pages/users/Users";

const routes: RouteObject[] = [
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <Layout />,
        children: [
          {
            // element: <Outlet />,
            children: [
              {
                path: "/",
                element: <DashboardPage />,
              },
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "/shipments",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <Shipments />,
                  },
                  {
                    path: "all",
                    element: <Shipments />,
                  },
                  {
                    path: ":shipmentName",
                    element: <Shipments />,
                  },
                  {
                    path: "shipment-details/:shipmentId",
                    element: <ShipmentDetails />,
                  },
                  {
                    path: "add-shipment",
                    element: <AddShipment />,
                  },
                  {
                    path: "edit-shipment/:shipmentId",
                    element: <EditShipment />,
                  },
                  {
                    path: "delete-shipment/:shipmentId",
                    element: <DeleteShipment />,
                  },
                ],
              },
              {
                path: "/payment-vouchers",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <PaymentVouchers />,
                  },
                  {
                    path: "details/:paymentVoucherId",
                    element: <PaymentVoucherDetails />,
                  },
                  {
                    path: "add",
                    element: <AddPaymentVoucher />,
                  },
                  {
                    path: "edit/:id",
                    element: <EditPaymentVoucher />,
                  },
                  // {
                  //   path: "delete-payment-voucher/:paymentVoucherId",
                  //   element: <DeletePaymentVoucher />,
                  // },
                ],
              },
              {
                path: "/users",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <Users />,
                  },
                  {
                    path: "user-details/:userId",
                    element: <UserDetails />,
                  },
                  {
                    path: "add-user",
                    element: <AddUser />,
                  },
                  {
                    path: "edit-user/:userId",
                    element: <EditUser />,
                  },
                  {
                    path: "delete-user/:userId",
                    element: <DeleteUser />,
                  },
                ],
              },
              {
                path: "/drivers",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <Drivers />,
                  },
                  {
                    path: "driver-details/:driverId",
                    element: <DriverDetails />,
                  },
                  {
                    path: "add-driver",
                    element: <AddDriver />,
                  },
                  {
                    path: "edit-driver/:driverId",
                    element: <EditDriver />,
                  },
                  {
                    path: "delete-driver/:driverId",
                    element: <DeleteDriver />,
                  },
                ],
              },
              {
                path: "/clients",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <Clients />,
                  },
                  {
                    path: "client-details/:clientId",
                    element: <ClientDetails />,
                  },
                  {
                    path: "add-client",
                    element: <AddClient />,
                  },
                  {
                    path: "edit-client/:clientId",
                    element: <EditClient />,
                  },
                  {
                    path: "delete-client/:clientId",
                    element: <DeleteClient />,
                  },
                ],
              },
              {
                path: "/recipients",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <Recipients />,
                  },
                  {
                    path: "create",
                    element: <AddRecipient />,
                  },
                  {
                    path: ":recipientId",
                    element: <RecipientDetails />,
                  },
                  {
                    path: ":recipientId/delete",
                    element: <DeleteRecipient />,
                  },
                  {
                    path: ":recipientId/edit",
                    element: <EditRecipient />,
                  },
                ],
              },
              {
                path: "/alert-messages",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <AlertMessages />,
                  },
                  {
                    path: "select-recipients",
                    element: <SelectRecipients />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
