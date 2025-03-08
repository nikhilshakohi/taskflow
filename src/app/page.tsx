"use client";
import { useState, useEffect } from "react";
import "./todo.css";

export default function Home() {
  const [tasks, setTasks] = useState({
    current: [] as string[],
    backlog: [] as string[],
    completed: [] as string[],
    completedCount: 0,
  });
  const [task, setTask] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      const savedDate = localStorage.getItem("lastCompletedDate");
      const today = new Date().toDateString();

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (savedDate !== today) {
          parsedTasks.completed = [];
          parsedTasks.completedCount = 0;
          localStorage.setItem("lastCompletedDate", today);
        }
        setTasks(parsedTasks);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const updateTasks = (updates: Partial<typeof tasks>) =>
    setTasks((prev) => ({ ...prev, ...updates }));

  const addTask = () => {
    if (task.trim()) {
      updateTasks({ current: [...tasks.current, task.trim()] });
      setTask("");
    }
  };

  const moveTask = (from: keyof typeof tasks, to: keyof typeof tasks, index: number) => {
    if (!Array.isArray(tasks[from]) || !Array.isArray(tasks[to])) return;
    updateTasks({
      [from]: (tasks[from] as string[]).filter((_, i) => i !== index),
      [to]: [...(tasks[to] as string[]), tasks[from][index]],
    });
  };

  const completeTask = (index: number) =>
    updateTasks({
      current: tasks.current.filter((_, i) => i !== index),
      completed: [...tasks.completed, tasks.current[index]],
      completedCount: tasks.completedCount + 1,
    });

  return (
    <main>
      <h1>TaskFlow</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a task" />
      <button onClick={addTask}>Add</button>

      {(["current", "backlog", "completed"] as const).map((list) => (
        <section key={list}>
          <h2>{list.charAt(0).toUpperCase() + list.slice(1)}</h2>
          <ul>
            {tasks[list].map((t, i) => (
              <li key={i}>
                {t}
                {list !== "completed" && (
                  <div>
                    {list === "current" && (
                      <>
                        <button onClick={() => moveTask("current", "backlog", i)}>→ Backlog</button>
                        <button onClick={() => completeTask(i)}>✅ Done</button>
                      </>
                    )}
                    {list === "backlog" && (
                      <button onClick={() => moveTask("backlog", "current", i)}>← Current</button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Completed Today: {tasks.completedCount}</h2>
    </main>
  );
}
