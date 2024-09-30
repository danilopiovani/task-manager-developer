import { useEffect } from 'react';
import styles from './styles.module.scss';

import { useNavigate } from 'react-router-dom';
import { TaskType } from '../../types/components';
import { useTaskStore } from '../../stores/useTaskStore';
import { Bin } from '../icons';
import { useFetch } from '../../hooks/useFetch';
import { truncateText } from '../../utils';
import { toast } from 'react-toastify'

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const { data, error, deleteData, mutateData } = useFetch<TaskType>();
  const navigate = useNavigate();
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  useEffect(() => {
    if (data) {
      if (data.id) {
        updateTask(data.id, { completed: !task.completed });
        if(data.completed){
          toast.success('Task completed successfully');
        }
      }
    }
    if (error) {
      console.error('Fetch error:', error);
      toast.error('Error completing task');
    }
  }, [data, error]);

  const handleTaskComplete = async (e: React.ChangeEvent) => {
    e.stopPropagation();
    if (task.id) {
      mutateData(`/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      }, 'PUT');
    }
  };

  const handleTaskDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.id) {
      try {
        const response = await deleteData(`/tasks/${task.id}`);
        if (response?.status === 204) {
          deleteTask(task.id);
          toast.success('Task deleted successfully');
        }
      } catch (err) {
        console.error('Error deleting task:', err);
        toast.error('Error deleting task');
      }
    }
  };
  
  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.itemInfoContainer}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            value={task.id}
            checked={task.completed}
            onChange={(e) => handleTaskComplete(e)}
            className={styles.title}
          />
        </div>
        <div className={styles.itemInfo} onClick={handleClick}>
          <div className={`${styles.title} ${task.completed && styles.completed}`}>{truncateText(task.title, 60)}</div>
          <div className={`${styles.description} ${task.completed && styles.completed}`}>{truncateText(task.description, 60)}</div>
        </div>
      </div>
      <div className={styles.actionBtn} onClick={handleTaskDelete}>
        <Bin size='md' />
      </div>
    </div>
  );
};

export default Task;
