import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from './SignupForm.module.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(formData.username && formData.password && formData.password === formData.passwordConf);
  };

  return (
    <main className={styles.container}>
      
      <div className={styles.leftPanel}>
        <h2>Join Us</h2>
        <p>Already have an account?</p>
        <Link to="/signin">
          <button className={styles.signInButton}>Sign In</button>
        </Link>
      </div>

      
      <div className={styles.rightPanel}>
        <h1 className={styles.signupTitle}>Sign Up</h1>
        <p className={styles.errorMessage}>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="passwordConf">Confirm Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="passwordConf"
              value={formData.passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className={styles.signupButton} disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button className={styles.cancelButton}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
