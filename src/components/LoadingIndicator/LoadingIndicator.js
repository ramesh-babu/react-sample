import React, {Component} from 'react';
import styles from './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {

  render() {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader} />
      </div>
    );
  }
}

