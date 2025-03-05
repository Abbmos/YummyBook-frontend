import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from './SigninForm.module.css';
import Logo from '../../assets/images/Logo1.png';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
    
          
      
      <div className={styles.leftPanel}>
        <h2>Welcome Back</h2>
        <img className={styles.bgImg} src={Logo} alt="Logo1" />
        <Link to="/signup">
          <button className={styles.createAccountBtn}>Sign up</button>
        </Link>
        
      </div>

      
      <div className={styles.rightPanel}>
        <h1 className={styles.signinTitle}>Sign In!</h1>
        <p className={styles.errorMessage}>{message}</p>
        <form id={styles.singinform} autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className={styles.signinBtn}>Sign In!</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SigninForm;
