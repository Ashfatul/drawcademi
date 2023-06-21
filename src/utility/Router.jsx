import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Error404 from "../components/Errors/Error404/Error404";
import OtherError from "../components/Errors/OtherError/OtherError";
import Login from "../components/Auth/Login/Login";
import Registration from "../components/Auth/Registration/Registration";
import Home from "../pages/Home";
import Instructors from "../components/Instructors/Instructors";
import Classes from "../components/Classes/Classes";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardRoute from "../routes/DashboardRoute";
import AdminLayout from "../components/Dashboard/Admin/AdminLayout";
import AdminRoute from "../routes/AdminRoute";
import InstructorRoute from "../routes/InstructorRoute";
import StudentRoute from "../routes/StudentRoute";
import InstructorLayout from "../components/Dashboard/Instructor/InstructorLayout";
import StudentLayout from "../components/Dashboard/Student/StudentLayout";
import ManageUsers from "../components/Dashboard/Admin/ManageUsers";
import AddClass from "../components/Dashboard/Instructor/AddClass";
import MyClasses from "../components/Dashboard/Instructor/MyClasses";
import ManageClasses from "../components/Dashboard/Admin/ManageClasses";
import SelectedClasses from "../components/Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../components/Dashboard/Student/EnrolledClasses";
import PaymentHistory from "../components/Dashboard/Student/PaymentHistory";
import ClassesOfInstructor from "../components/Classes/ClassesOfInstructor";
import ProcessPayment from "../components/Dashboard/Student/ProcessPayment";
import UserProfile from "../components/UserProfile/UserProfile";
import UpdateProfile from "../components/UserProfile/UpdateProfile";
import UpdateClass from "../components/Dashboard/Instructor/UpdateClass";
import LoggedInRedirect from "../routes/LoggedInRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <OtherError />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <LoggedInRedirect>
            <Login />
          </LoggedInRedirect>
        ),
      },
      {
        path: "/registration",
        element: (
          <LoggedInRedirect>
            <Registration />
          </LoggedInRedirect>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/update/:id",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      { path: "/instructors", element: <Instructors /> },
      { path: "/classes", element: <Classes /> },
      { path: "/classes-of/:id", element: <ClassesOfInstructor /> },
      {
        path: "/dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </PrivateRoute>
        ),
        children: [
          { path: "/dashboard/admin", element: <ManageUsers /> },
          {
            path: "/dashboard/admin/manage-classes",
            element: <ManageClasses />,
          },
        ],
      },
      {
        path: "/dashboard/instructor",
        element: (
          <PrivateRoute>
            <InstructorRoute>
              <InstructorLayout />
            </InstructorRoute>
          </PrivateRoute>
        ),
        children: [
          { path: "/dashboard/instructor", element: <AddClass /> },
          { path: "/dashboard/instructor/my-classes", element: <MyClasses /> },
          {
            path: "/dashboard/instructor/update-class/:id",
            element: <UpdateClass />,
          },
        ],
      },
      {
        path: "/dashboard/student",
        element: (
          <PrivateRoute>
            <StudentRoute>
              <StudentLayout />
            </StudentRoute>
          </PrivateRoute>
        ),
        children: [
          { path: "/dashboard/student", element: <SelectedClasses /> },
          {
            path: "/dashboard/student/enrolled-classes/:id",
            element: <EnrolledClasses />,
          },
          {
            path: "/dashboard/student/payment/:id",
            element: <ProcessPayment />,
          },
          {
            path: "/dashboard/student/payment-history/:id",
            element: <PaymentHistory />,
          },
        ],
      },
    ],
  },

  { path: "*", element: <Error404 /> },
]);
