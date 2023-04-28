import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import VerticalTabs from "../pages/Admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/admin",
        element: <VerticalTabs />
    }
]);

export default router;