import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.Loader}>
    <TailSpin ariaLabel="loading" color="#02be6e" height={100} width={100} />
  </div>
);

export default Loader;
