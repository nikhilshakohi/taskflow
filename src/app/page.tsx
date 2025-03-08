"use client";
import { useState, useEffect } from "react";
import "./todo.css";

export default function Home() {
  const [tasks, setTasks] = useState(() => {
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
      return parsedTasks;
    }
    return { current: [], backlog: [], completed: [], completedCount: 0 };
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const updateTasks = (updates: Partial<typeof tasks>) =>
    setTasks((prev: typeof tasks) => ({ ...prev, ...updates }));

  const addTask = () =>
    (task.trim() &&
      updateTasks({ current: [...tasks.current, task.trim()] })) ||
    setTask("");

  const moveTask = (
    from: keyof typeof tasks,
    to: keyof typeof tasks,
    index: number
  ) =>
    updateTasks({
      [from]: tasks[from].filter((_: string, i: number) => i !== index),
      [to]: [...tasks[to], tasks[from][index]],
    });

  const completeTask = (index: number) =>
    updateTasks({
      current: tasks.current.filter((_: string, i: number) => i !== index),
      completed: [...tasks.completed, tasks.current[index]],
      completedCount: tasks.completedCount + 1,
    });

  return (
    <main>
      <h1>TaskFlow</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add</button>

      {(["current", "backlog", "completed"] as const).map((list) => (
        <section key={list}>
          <h2>{list.charAt(0).toUpperCase() + list.slice(1)}</h2>
          <ul>
            {tasks[list].map((t: string, i: number) => (
              <li key={i}>
                {t}
                {list !== "completed" && (
                  <div>
                    {list === "current" && (
                      <button onClick={() => moveTask("current", "backlog", i)}>
                        → Backlog
                      </button>
                    )}
                    {list === "backlog" && (
                      <button onClick={() => moveTask("backlog", "current", i)}>
                        ← Current
                      </button>
                    )}
                    {list === "current" && (
                      <button onClick={() => completeTask(i)}>✅ Done</button>
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
