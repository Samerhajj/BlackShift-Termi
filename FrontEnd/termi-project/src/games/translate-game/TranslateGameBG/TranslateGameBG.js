import React from 'react';
import styles from "./TranslateGameBG.module.css";

function TranslateGameBG() {
  return (
     <div className={styles.translateGameBG}>
    <div className={styles.sky}>
      {/* We are making divisions, every div represents a single shooting star */}
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
    </div>
    </div>
  );
}

export default TranslateGameBG;