import styles from './styles.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Footer, Header, TaskList, TaskDetails} from './components'
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;
