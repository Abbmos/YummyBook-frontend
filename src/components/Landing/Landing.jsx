import styles from './Landing.module.css';
import Logo from '../../assets/images/Logo1.png';


const Landing = () => {
  return (
    
    <div className={styles.landingContainer}>
    {/* <div className={styles.welcomeWindow}>
      <div className={styles.windowContent}>
        <img className={styles.logo} src={Logo} alt="Logo" />
        <h1>Hello, you are on the landing page for visitors</h1>
        <p>
          If you sign up for a new account, you will have the ability to sign
          in and access the app ..
        </p>
      </div>
    </div> */}
    <div className="bgImg"> 
      <img className={styles.bgImg} src={Logo} alt="Logo1" />
    </div>
  </div>
  
);
};

export default Landing;
