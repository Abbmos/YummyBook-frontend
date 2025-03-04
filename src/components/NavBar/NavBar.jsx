import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="../src/images/Logo.png" alt="logo" width="40" height="40" style={{ marginTop: '-3px' }} />
          Recipe App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recipes/new">New Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="" onClick={handleSignout}>Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
