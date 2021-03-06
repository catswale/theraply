import React from 'react';
import styles from './style.module.css';

const Home = () => (
  <section className={styles.mainContainer}>
    <p className={styles.boldCaptionText}>Welcome Jane!</p>
    <p className={styles.captionText}>
      Thank you for connecting with and empowering your clients
    </p>
  </section>
);

export default Home;
