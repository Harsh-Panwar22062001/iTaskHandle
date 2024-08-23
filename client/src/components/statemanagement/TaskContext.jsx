// TaskContext.js or TaskContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now() }]);
  };

 // TaskContext.jsx
const updateTask = (updatedTask) => {
  console.log("Updating task:", updatedTask);
  setTasks((prevTasks) =>
    prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  );
};


  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
