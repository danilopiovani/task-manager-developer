import styles from './styles.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/images/logo.png" width='60' height='60'  alt="NSW Logo" />
      <div>
        <span className={styles.title}>Developer Assessment</span>
        <span className={styles.subTitle}>To-Do Application</span>
      </div>
    </header>
  )
}

export default Header