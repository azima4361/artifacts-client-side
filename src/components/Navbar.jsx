import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Successful',
      showConfirmButton: false,
      timer: 2000,
    });
    navigate('/');
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="font-semibold" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/artifacts" className="font-semibold">
          All Artifacts
        </NavLink>
      </li>
      {user?.email && (
        <li>
          <NavLink to="/add-artifact" className="font-semibold">
            Add Artifact
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          ArtifactTracker
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || 'My Profile'}
            >
              {user?.photoURL ? (
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="User Profile" />
                </div>
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/my-artifacts">My Artifacts</NavLink>
              </li>
              <li>
                <NavLink to="/liked-artifacts">Liked Artifacts</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
