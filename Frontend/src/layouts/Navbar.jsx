import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {
    const location = useLocation()
    //  console.log(location.pathname)
    const authToken = localStorage.getItem("authtoken");
    const handleLogout = () => {
        // Clear the "authtoken" from local storage
        localStorage.removeItem("authtoken");
        window.location.reload();
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* home */}
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {/* Home */}
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* home */}
                                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/* all notes */}
                                <Link className={`nav-link ${location.pathname === "/notes" ? 'active' : ''}`} to="/notes">All Notes</Link>
                            </li>
                            <li className="nav-item">
                                {/* add note */}
                                <Link className="nav-link" to="/addnote">Add Note</Link>
                            </li>
                            <li className="nav-item">
                                {/* about */}
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                {/* contact */}
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        {/* if user has authtoken in browser local storage, change these login / register buttons with logout buttons, else show these buttons */}
                        {/* auth buttons */}
                        <div className="d-flex mx-2" >
                            <ul className="d-flex">
                  {authToken ? (
                    // If authtoken exists, display the Logout button
                    <li>
                      <button onClick={handleLogout} className="me-2 btn btn-danger">
                        Logout
                      </button>
                    </li>

                  ) : (
                    // If authtoken doesn't exist, display the Login and Register buttons
                    <>
                      <li>
                        <Link
                          className={`nav-link `}
                          to="/auth/login"
                        >
                          <button className="me-2 btn btn-primary">
                            Login
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`nav-link `}
                          to="/auth/register"
                        >
                          <button
                            className="me-2 btn btn-success"
                            type="submit"
                          >
                            Register
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                  </ul>
     </div>
            </div>
            </div>
            </nav>

        </>
    )
}

export default Navbar