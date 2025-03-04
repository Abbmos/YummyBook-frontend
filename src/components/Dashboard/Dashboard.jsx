import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  return (
    <main className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Welcome to YummyBook, {user.username}!</h1>
        <p>Your one-stop destination for easy and delicious recipes!</p>
      </header>
      <section className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🍽️</div>
          <h3>Share and Explore!</h3>
          <p>Join our community to share, explore, and discover a variety of delicious recipes.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🔍</div>
          <h3>Discover!</h3>
          <p>Browse a vast collection of ready-made recipes to suit your taste and preferences.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🥗</div>
          <h3>Recipe Generation!</h3>
          <p>Input ingredients you have, and get personalized recipes tailored just for you.</p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
