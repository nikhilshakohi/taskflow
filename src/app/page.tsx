"use client";
import { useState, useEffect } from "react";
import "./todo.css";

export default function Home() {
  const [tasks, setTasks] = useState({
    current: [] as string[],
    backlog: [] as string[],
    completed: [] as string[],
  });
  const [task, setTask] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
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

  const moveTask = (
    from: keyof typeof tasks,
    to: keyof typeof tasks,
    index: number
  ) => {
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
    });
  console.log("cc:", tasks, task);

  return (
    <main>
      <h1>TaskFlow</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <br />
      <button className="addBtn" onClick={addTask}>
        Add
      </button>

      {(["current", "backlog", "completed"] as const).map((list) => (
        <section key={list}>
          <h2>
            {list.charAt(0).toUpperCase() + list.slice(1)} ({tasks[list].length}
            )
          </h2>
          <ul>
            {tasks[list].map((task, index) => (
              <li key={index}>
                {task}
                {list !== "completed" && (
                  <div>
                    {list === "current" && (
                      <>
                        <button
                          className="actionBtn"
                          onClick={() => moveTask("current", "backlog", index)}
                        >
                          → Backlog
                        </button>
                        <button
                          className="actionBtn"
                          onClick={() => completeTask(index)}
                        >
                          ✅ Done
                        </button>
                      </>
                    )}
                    {list === "backlog" && (
                      <button
                        className="actionBtn"
                        onClick={() => moveTask("backlog", "current", index)}
                      >
                        ← Current
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
