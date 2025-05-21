import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, setUser, signInByGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSignInGoogle = () => {
    signInByGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        // toast.success("Logged in with Google!");
        // navigate(location?.state || "/");
        // localStorage.setItem("userEmail", user.email);

        fetch('https://artifacts-server-side.vercel.app/jwt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email: user.email })
})
  .then(res => res.json())
  .then(() => {
    toast.success("Logged in with Google!");
    navigate(location?.state || "/");
  })
  .catch(() => {
    toast.error("JWT issue during Google login");
  });

      })
      .catch(() => {
        setError("Google sign-in failed.");
        toast.error("Google sign-in failed.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        
        // toast.success("Login successful!");
        // navigate(location?.state || "/");
        
        // localStorage.setItem("userEmail", user.email);

        fetch('https://artifacts-server-side.vercel.app/jwt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email })
})
  .then(res => res.json())
  .then(() => {
    toast.success("Login successful!");
    navigate(location?.state || "/");
  })
  .catch(() => {
    toast.error("JWT issue during login");
  });


        
        const lastSignInTime = user?.metadata?.lastSignInTime;
        fetch('https://artifacts-server-side.vercel.app/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lastSignInTime })
        }).catch(console.error);
      })
      .catch(() => {
        setError("Invalid email or password.");
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Login to Your Account</h2>

        <button
          onClick={handleSignInGoogle}
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white rounded-lg py-2 font-medium hover:shadow-md transition"
        >
          <FcGoogle className="text-2xl" /> Login with Google
        </button>

        <div className="text-center text-gray-500 text-sm">or login with email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-right">
            <Link to="/reset/password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <Link to="/register" className="font-medium text-blue-600 ml-1 hover:underline">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
