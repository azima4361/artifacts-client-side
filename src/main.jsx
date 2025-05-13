import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import AllArtifacts from './components/AllArtifacts.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
import AddArtifacts from './components/AddArtifacts.jsx';
import MyArtifacts from './components/MyArtifacts.jsx';
import LikedArtifacts from './components/LikedArtifacts.jsx';
import ArtifactDetails from './components/ArtifactDetails.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/artifacts",
        element:<AllArtifacts></AllArtifacts>,
      },
      {
        path: "/artifact/:id",
        element:<PrivateRoute><ArtifactDetails></ArtifactDetails></PrivateRoute>,
      },
      {
        path:"/add-artifact",
        element: <PrivateRoute><AddArtifacts></AddArtifacts></PrivateRoute>
      },
      {
        path:"/my-artifacts",
        element: <PrivateRoute><MyArtifacts></MyArtifacts></PrivateRoute>
      },
      {
        path:"/liked-artifacts",
        element: <PrivateRoute><LikedArtifacts></LikedArtifacts></PrivateRoute>
      }
    ]

  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
