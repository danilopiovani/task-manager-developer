import {useState, useEffect, useRef} from 'react';
import styles from './styles.module.scss';

import { useTaskStore } from '../../stores/useTaskStore';
import { Plus, Pencil, Close } from '../icons';
import { useFetch } from '../../hooks/useFetch';
import { TaskType } from '../../types/components';
import { Button } from '../../components';
import { toast } from 'react-toastify'

interface Props{
  task?: TaskType;
  action: 'add' | 'update';
  callback?: () => void;
}

const TaskForm = (Props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateButtonRef = useRef<HTMLButtonElement>(null);
  const insertButtonRef = useRef<HTMLButtonElement>(null);
  const { task, action = 'add', callback } = Props;
  const { data, error, mutateData } = useFetch<TaskType>();
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(task?.description || '');
  const [formError, setFormError] = useState<{title: boolean, description: boolean}>({title: false, description: false});

  useEffect(() => {
    if(data){
      if(action === 'add'){
        addTask(data);
        toast.success('New task created successfully');
        setTitle('');
        setDescription('');
      } else {
        if(data.id){
          updateTask(data.id, data);
          toast.success('Task updated successfully');
        }
        callback && callback();
      }
    }
    if(error){
      console.error('Fetch error:', error);
      toast.error(`Error ${action === 'add' ? 'adding' : 'updating'} task`);
    }
  }, [data, addTask, error]);

  const handleNewTask = async() => {
    checkError();
    if(title.trimStart() && description.trimStart()){
      mutateData('/tasks', {
        title,
        description,
        completed: false
      }, 'POST');
    }
  }

  const handleUpdate = async () => {
    checkError();
    if (title.trimStart() && description.trimStart() && task?.id) {
      mutateData(`/tasks/${task?.id}`, {
        title,
        description,
        completed: false,
      }, 'PUT');
    }
  };

  const checkError = () => {
    let formError = {title: false, description: false};
    if(!title.trim()){
      formError.title = true;
    }
    if(!description.trim()){
      formError.description = true;
    }
    
    if(formError.title || formError.description){
      toast.error('Title and description are required');
    }
    setFormError(formError);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.id === 'title' && action === 'add') {
        textareaRef.current?.focus();
      } else {
        checkError();
        if (title.trimStart() && description.trimStart()) {
          if (action === 'add') {
            handleNewTask();
          } else {
            handleUpdate();
          }
        }
      }
    } else if (e.key === 'Escape') {
        if (action === 'update') {
          callback && callback();
        } else {
          setTitle('');
          setDescription('');
        }
    }
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if(action === 'add'){
        insertButtonRef.current?.focus();
      } else {
        updateButtonRef.current?.focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={title} 
          onChange={(e) => {setTitle(e.target.value); setFormError({...formError, title: false})}} 
          placeholder={formError.title ? 'Title is required' : 'Title'}
          className={formError.title ? styles.error : ''} 
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <textarea 
          rows={4} 
          id="description" 
          name="description" 
          value={description}
          onChange={(e) => {setDescription(e.target.value); setFormError({...formError, description: false})}} 
          placeholder={formError.description ? 'Description is required' : 'Description'}
          className={formError.description ? styles.error : ''} 
          onKeyDown={handleTabKey}
          ref={textareaRef}
        />
      </div>
      <div className={`${styles.buttonContainer} ${action === 'update' && styles.twoButtons}`}>
      { action === 'add' ? (
        <Button callback={handleNewTask} ref={insertButtonRef}><Plus /> ADD</Button>
      ) : (
        <>
          <Button callback={() => callback && callback()}><Close /> CLOSE</Button>
          <Button callback={handleUpdate} ref={updateButtonRef}><Pencil /> UPDATE</Button>
        </>
      )}
      </div>
    </div>
  )
}

export default TaskForm