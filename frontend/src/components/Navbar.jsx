import { useSelector } from "react-redux";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const token = useSelector((state) => state.token.token);
  const cookieToken = Cookies.get("token");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" to="/">
            EMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {token !== null || cookieToken ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/employee" className="nav-link">
                    Create Empolyee
                  </NavLink>
                </li>
              </ul>
              <div>
                <button className="btn btn-outline-primary">Logout</button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
}
