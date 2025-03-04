import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/Logo.png';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={Logo} alt="Logo" />
      </Link>
      <ul>
        {user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/recipes/new">New Recipe</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
