import { forwardRef } from 'react';
import styles from './styles.module.scss';
interface Props{
  children?: React.ReactNode;
  callback?: () => void;
  tabIndex?: number;
}
const Button = forwardRef<HTMLButtonElement, Props>(({ children, callback, tabIndex }, ref) => {
  return (
    <button className={styles.btn} onClick={() => callback && callback()} tabIndex={tabIndex} ref={ref}>
      <div>{children}</div>
    </button>
  );
});

export default Button