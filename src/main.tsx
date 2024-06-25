import React from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./pages/login/Login.tsx";
import { Registers } from "./pages/registers/Registers.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SaveRegister } from "./pages/registers/SaveRegister.tsx";
import { SaveUser } from "./pages/admin/AddUser.tsx";
import { Home } from "./pages/admin/Home.tsx";
import { RegisterDetails } from "./pages/registers/RegisterDetails.tsx";
import AssignRegister from "./pages/assign/AssignRegister.tsx";
import ManualAssign from "./pages/assign/ManualAssign.tsx";
import RegisterEstadisticas from "./pages/registers/RegisterEstadisticas.tsx";
import Users from "./pages/admin/Users.tsx";
import { AuthProvider } from "./AuthProvider.tsx";
import Test from "./test.tsx";
import { ReporteProvider } from "./documents/ReporteContext.tsx";
import PDF from "./documents/PDF.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "test",
    element: <Test />
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/registers",
    element: <Registers />,
  },
  {
    path: "/details/:registerId",
    element: <RegisterDetails />,
  },
  {
    path: "/add/register",
    element: <SaveRegister />,
  },
  {
    path: "/edit/:registerId",
    element: <SaveRegister />,
  },
  {
    path: "/users",
    element: <Users /> 
  },
  {
    path: "/add/user",
    element: <SaveUser />,
  },
  {
    path: "/edit/:userId",
    element: <SaveUser />,
  },
  {
    path: "/assign",
    element: <AssignRegister />
  },
  {
    path: "/assign/manual",
    element: <ManualAssign />
  },
  {
    path: "/registers/estadisticas",
    element: <RegisterEstadisticas/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ReporteProvider>
        <RouterProvider router={router}></RouterProvider>
      </ReporteProvider>
    </AuthProvider>
  </React.StrictMode>,
);
