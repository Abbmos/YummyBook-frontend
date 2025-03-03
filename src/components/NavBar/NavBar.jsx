import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './NavBar.module.css'


const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
    { user ? (
      <nav className={styles.container}>
        <ul>
        <li>Welcome, {user.username}</li>
          <Link to="/"><li>Home</li></Link>
          <Link to="/"><li>Recipe</li></Link>
          <Link to="/"><li>New Recipe</li></Link>
          <Link to="" onClick={handleSignout}><li>Sign Out</li></Link>
        </ul>
      </nav>
    ) : (
      <nav className={styles.container}>
        <ul>
          <Link to="/signin"><li>Sign In</li></Link>
          <Link to="/signup"><li>Sign Up</li></Link>
        </ul>
      </nav>
    )}
  </>
)
}
export default NavBar;


