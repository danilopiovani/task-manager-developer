import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { useParams } from 'react-router-dom';
import { useTaskStore } from '../../stores/useTaskStore';
import { TaskType } from '../../types/components';
import { TaskForm, Breadcrumbs } from '../../components';
import { Pencil, Error } from '../icons';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, fetchData, mutateData } = useFetch<TaskType>();
  const task = useTaskStore((state) => state.tasks.find((task: TaskType) => task.id === id));
  const [currentTask, setCurrentTask] = useState<TaskType | undefined>(task);
  const [title, setTitle] = useState<string>(currentTask?.title || '');
  const [description, setDescription] = useState<string>(currentTask?.description || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
      setTitle(task.title);
      setDescription(task.description);
    } else if (!fetchAttempted) {
      fetchData(`/tasks/${id}`);
      setFetchAttempted(true);
    }
  }, [task, id, fetchData, mutateData, fetchAttempted]);

  useEffect(() => {
    if (data) {
      setCurrentTask(data);
      setTitle(data.title);
      setDescription(data.description);
    } else if (error) {
      console.error('Fetch error:', error);
      setCurrentTask(undefined);
    }
  }, [data, error]);

  return (
    <div className={styles.taskDetails}>
      <div className={styles.breadcrumb}><Breadcrumbs task={currentTask} /></div>
      {!currentTask ? (
        <div className={styles.cardContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <img src={`/images/banner.jpg`} alt='Header Task' loading='lazy'  />
            </div>
              <div className={styles.content}>
                <div className={styles.titleWrong}> 
                  <Error size='xl'/> TASK NOT FOUND <Link to="/"><span>Go back to the homepage</span></Link>
                </div>
              </div>
          </div>
        </div>
      ) : (
        <div className={styles.cardContainer}>
            <div className={styles.contentWrapper}>
              <div className={styles.header}>
                <img src={`/images/banner.jpg`} alt='Header Task' loading='lazy'  />
              </div>
              <div className={styles.content}>
                <div className={styles.title}> 
                  <p>{title}</p>
                  { !isEditing && <div className={styles.btn} onClick={() => setIsEditing(true)}><Pencil size='lg' /></div> }
                </div>
                { !isEditing ? (
                  <div className={styles.description}>{description}</div>
                ) : (
                  <div className={styles.formContainer}>
                      <TaskForm task={currentTask} action='update' callback={() => setIsEditing(false)} />
                  </div>  
                )}
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default TaskDetails;
