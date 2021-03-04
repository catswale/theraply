import React from 'react';
import styles from './style.module.css';

const Home = () => (
  <section className={styles.main__container}>
    <p className={styles.bold__caption__text}>Welcome Jane!</p>
    <p className={styles.caption__text}>
      Thank you for connecting with and empowering your clients
    </p>
  </section>
);

export default Home;
