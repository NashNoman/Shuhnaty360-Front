import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './Layout';
import { SidebarProvider } from './context/SidebarContext';
import AllShipments from './pages/shipments/AllShipments';
import DeliveredShipments from './pages/shipments/DeliveredShipments';
import DelayedShipments from './pages/shipments/DelayedShipments';
import ReturnedShipments from './pages/shipments/ReturnedShipments';
import ShipmentDetails from './pages/shipments/shipment/ShipmentDetails';
import AddShipment from './pages/shipments/shipment/AddShipment';
import EditShipment from './pages/shipments/shipment/EditShipment';
import DeleteShipment from './pages/shipments/shipment/DeleteShipment';
import Users from './pages/users/Users';
import AddUser from './pages/users/AddUser';
import EditUser from './pages/users/EditUser';
import UserDetails from './pages/users/UserDetails';
import DeleteUser from './pages/users/DeleteUser';
import Drivers from './pages/drivers/Drivers';
import AddDriver from './pages/drivers/AddDriver';
import DriverDetails from './pages/drivers/DriverDetails';
import EditDriver from './pages/drivers/EditDriver';
import DeleteDriver from './pages/drivers/DeleteDriver';
import Clients from './pages/clients/Clients';
import AddClient from './pages/clients/AddClient';
import ClientDetails from './pages/clients/ClientDetails';
import EditClient from './pages/clients/EditClient';
import DeleteClient from './pages/clients/DeleteClient';
import AlertMessages from './pages/alertMessages/AlertMessages';
import InShippingShipments from './pages/shipments/InShippingShipments';
import CancelledShipments from './pages/shipments/CancelledShipments';
import SelectRecipients from './pages/alertMessages/SelectRecipients';
import CompletedShipments from './pages/shipments/CompletedShipments';

function App() {
  return (
    <div dir='rtl'>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Login />}
            />

            <Route
              path='dashboard'
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />

            <Route
              path='/shipments'
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<AllShipments />}
              />{' '}
              <Route
                path='all'
                element={<AllShipments />}
              />
              <Route
                path='delivered'
                element={<DeliveredShipments />}
              />
              <Route
                path='completed'
                element={<CompletedShipments />}
              />
              <Route
                path='in-shipping'
                element={<InShippingShipments />}
              />
              <Route
                path='delayed'
                element={<DelayedShipments />}
              />
              <Route
                path='Cancelled'
                element={<CancelledShipments />}
              />
              <Route
                path='returned'
                element={<ReturnedShipments />}
              />
              <Route
                path='shipment-details/:shipmentId'
                element={<ShipmentDetails />}
              />
              <Route
                path='add-shipment'
                element={<AddShipment />}
              />
              <Route
                path='edit-shipment/:shipmentId'
                element={<EditShipment />}
              />
              <Route
                path='delete-shipment/:shipmentId'
                element={<DeleteShipment />}
              />
            </Route>
            <Route
              path='/users'
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<Users />}
              />{' '}
              <Route
                path='user-details/:userId'
                element={<UserDetails />}
              />
              <Route
                path='add-user'
                element={<AddUser />}
              />
              <Route
                path='edit-user/:userId'
                element={<EditUser />}
              />
              <Route
                path='delete-user/:userId'
                element={<DeleteUser />}
              />
            </Route>
            <Route
              path='/drivers'
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<Drivers />}
              />
              <Route
                path='driver-details/:driverId'
                element={<DriverDetails />}
              />
              <Route
                path='add-driver'
                element={<AddDriver />}
              />
              <Route
                path='edit-driver/:driverId'
                element={<EditDriver />}
              />
              <Route
                path='delete-driver/:driverId'
                element={<DeleteDriver />}
              />
            </Route>
            <Route
              path='/clients'
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<Clients />}
              />
              <Route
                path='client-details/:clientId'
                element={<ClientDetails />}
              />
              <Route
                path='add-client'
                element={<AddClient />}
              />
              <Route
                path='edit-client/:clientId'
                element={<EditClient />}
              />
              <Route
                path='delete-client/:clientId'
                element={<DeleteClient />}
              />
            </Route>
            <Route
              path='/alert-messages'
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                index
                element={<AlertMessages />}
              />
              <Route
                path='select-recipients'
                element={<SelectRecipients />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </div>
  );
}

export default App;
