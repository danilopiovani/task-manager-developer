import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.social}>
            <a href="https://www.linkedin.com/in/danilopiovani/" target="_blank" rel="noreferrer">
                <img src="/images/linkedin-icon.svg" width='30' height='30' alt="LinkedIn" />
            </a>
            <a href="https://github.com/danilopiovani" target="_blank" rel="noreferrer">
                <img src="/images/github-icon.svg" width='30' height='30' alt="GitHub" />
            </a>
        </div>
        <div className={styles.text}>Created with ❤️ by <a href="https://www.linkedin.com/in/danilopiovani/" target="_blank" rel="noreferrer">Danilo Piovani</a></div>
    </footer>
  )
}

export default Footer