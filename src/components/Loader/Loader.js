import { TailSpin } from 'react-loader-spinner';
import React, { Component } from 'react';
import styles from '../Loader/Loader.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles.Loader}>
        <TailSpin ariaLabel="loading" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}
