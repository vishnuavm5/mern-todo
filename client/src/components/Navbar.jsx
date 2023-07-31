import ".././App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <button className="btn btn-ghost normal-case text-xl">
            <Link to="/">The Todo App</Link>
          </button>
        </div>
        <div className="navbar-end">
          {!cookie.access_token ? (
            <>
              <button className="btn  btn-ghost">
                <Link to="/auth">SignUp</Link>
              </button>
              <button className="btn  btn-ghost">
                <Link to="/auth">Login</Link>
              </button>
            </>
          ) : (
            <button className="btn  btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
