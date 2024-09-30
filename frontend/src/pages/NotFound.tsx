import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.container}>
        <img src='/images/404.jpg' alt='404 Image' />
      <p>Page not exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotFound;
