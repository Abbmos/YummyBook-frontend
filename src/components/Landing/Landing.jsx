import styles from './Landing.module.css';
import Logo from '../../assets/images/Logo1.png';


const Landing = () => {
  return (
    
    <div className={styles.landingContainer}>
    <p>
    Welcome to YummyBook—your go-to for quick,
      tasty recipes! Whether you're a novice or a pro,
      find easy-to-follow instructions and delicious dishes to elevate your cooking.
    </p>
    <div className="bgImg"> 
      <img className={styles.bgImg} src={Logo} alt="Logo1" />
    </div>
  </div>
  
);
};

export default Landing;
