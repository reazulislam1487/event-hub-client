import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import PrivateRoute from "../Contexts/PrivateRoute";
import Register from "../Pages/Shared/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AllEvents from "../Pages/DashboardPages/AllEvents";
import NotFound from "../Pages/Shared/NotFound";
import MyEvents from "../Pages/DashboardPages/MyEvents";
import AddEvents from "../Pages/DashboardPages/AddEvents";
import DashboardOverview from "../Pages/DashboardPages/DashboardOverview";
import AllEventsForDashboard from "../Pages/DashboardPages/AllEventsForDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/events",
        element: (
          <PrivateRoute>
            <AllEvents></AllEvents>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout> </DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview></DashboardOverview> },

      {
        path: "/dashboard/my-events",
        element: <MyEvents></MyEvents>,
      },
      {
        path: "/dashboard/all-events",
        element: <AllEventsForDashboard></AllEventsForDashboard>,
      },
      {
        path: "/dashboard/add-events",
        element: <AddEvents></AddEvents>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
