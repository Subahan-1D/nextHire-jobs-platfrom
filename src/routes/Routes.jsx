import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/Error";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Register";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path:'/job/:id',
        element:<JobDetails></JobDetails>,
        loader:({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path:"/add-job",
        element:<AddJob></AddJob>
      }
      ,
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
