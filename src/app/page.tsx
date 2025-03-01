"use client";
import { useState, useEffect } from "react";
import "./todo.css";

export default function Home() {
  const [currentTasks, setCurrentTasks] = useState<string[]>([]);
  const [backlogTasks, setBacklogTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [task, setTask] = useState("");

  // ✅ Load tasks from localStorage when the page loads
  useEffect(() => {
    const savedCurrent = localStorage.getItem("currentTasks");
    const savedBacklog = localStorage.getItem("backlogTasks");
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    const savedCount = localStorage.getItem("completedCount");
    const savedDate = localStorage.getItem("lastCompletedDate");
    const today = new Date().toDateString();

    if (savedCurrent) setCurrentTasks(JSON.parse(savedCurrent));
    if (savedBacklog) setBacklogTasks(JSON.parse(savedBacklog));

    if (savedDate !== today) {
      localStorage.setItem("completedCount", "0");
      localStorage.setItem("lastCompletedDate", today);
      localStorage.setItem("completedTasks", JSON.stringify([]));
      setCompletedCount(0);
      setCompletedTasks([]);
    } else {
      if (savedCount) setCompletedCount(parseInt(savedCount, 10));
      if (savedCompletedTasks) setCompletedTasks(JSON.parse(savedCompletedTasks));
    }
  }, []);

  // ✅ Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  }, [currentTasks]);

  useEffect(() => {
    localStorage.setItem("backlogTasks", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  const saveCompletedData = (count: number, tasks: string[]) => {
    localStorage.setItem("completedCount", count.toString());
    localStorage.setItem("lastCompletedDate", new Date().toDateString());
    localStorage.setItem("completedTasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    if (task.trim()) {
      setCurrentTasks([...currentTasks, task.trim()]);
      setTask("");
    }
  };

  const moveToBacklog = (index: number) => {
    const taskToMove = currentTasks[index];
    setCurrentTasks(currentTasks.filter((_, i) => i !== index));
    setBacklogTasks([...backlogTasks, taskToMove]);
  };

  const moveToCurrent = (index: number) => {
    const taskToMove = backlogTasks[index];
    setBacklogTasks(backlogTasks.filter((_, i) => i !== index));
    setCurrentTasks([...currentTasks, taskToMove]);
  };

  const completeTask = (index: number) => {
    const taskToComplete = currentTasks[index];
    const newCompletedTasks = [...completedTasks, taskToComplete];

    setCurrentTasks(currentTasks.filter((_, i) => i !== index));
    setCompletedTasks(newCompletedTasks);

    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    saveCompletedData(newCount, newCompletedTasks);
  };

  return (
    <main>
      <h1>TaskFlow</h1>

      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a task" 
      />
      <button onClick={addTask}>Add</button>

      <h2>Current Tasks</h2>
      <ul>
        {currentTasks.map((t, i) => (
          <li key={i}>
            {t} 
            <button onClick={() => moveToBacklog(i)}>→ Backlog</button>
            <button onClick={() => completeTask(i)}>✅ Done</button>
          </li>
        ))}
      </ul>

      <h2>Backlog</h2>
      <ul>
        {backlogTasks.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => moveToCurrent(i)}>← Current</button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h2>Completed Today: {completedCount}</h2>
    </main>
  );
}
