import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { TaskType } from '../../types/components';
import { Home } from '../icons';
import { truncateText } from '../../utils';

interface Props {
  task?: TaskType;
}

const Breadcrumbs = (props: Props) => {
  return (
    <div className={styles.content}>
      <nav className={styles.breadcrumbs}>
        <Home /><Link to="/">Home</Link>
      { props?.task?.id && (
        <span className={styles.breadcrumbItem}>
          <span className={styles.separator}>&nbsp;|&nbsp;</span>
          <span>Task - {truncateText(props?.task.title, 30)}</span>
        </span>
      )}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
