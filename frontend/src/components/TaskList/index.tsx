import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import { Task, TaskForm } from '../../components';
import { TaskType } from '../../types/components';
import { useTaskStore } from '../../stores/useTaskStore';
import { ListIcon } from '../icons';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'react-toastify'

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const tasks = useTaskStore((state: { tasks: TaskType[] }) => state.tasks);
  const loadTasks = useTaskStore((state: { loadTasks: (tasks: TaskType[]) => void }) => state.loadTasks);
  const { data, error, fetchData } = useFetch<TaskType[]>();
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);

  useEffect(() => {
    if (tasks?.length === 0 && !fetchAttempted) {
      fetchData('/tasks');
      setFetchAttempted(true);
      setTaskList(tasks);
    } else {
        setTaskList(tasks);
    }
  }, [tasks, fetchData, fetchAttempted]);

  useEffect(() => {
    if (data && data.length > 0 && tasks?.length === 0) {
      loadTasks(data);
      setTaskList(data);
    }
    if (error) {
      console.error('Fetch error:', error);
      toast.error('Error loading tasks');
    }
  }, [data, error, loadTasks]);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <ListIcon size="lg" />
        <span>Task List</span>
      </div>
     {taskList?.length === 0 ? (
        <div className={styles.empty}>
          <h2>Welcome!</h2>
          <p>It looks like you don’t have any tasks yet.</p></div>
      ) : (
        taskList?.map((task: TaskType) => (
          <Task key={task.id} task={task} />
        ))
      )}
      <TaskForm action='add' />
      <div className={styles.spacer}>&nbsp;</div>
    </section>
  );
};

export default TaskList;
