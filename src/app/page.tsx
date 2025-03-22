"use client";
import { useState, useEffect } from "react";
import "./todo.css";
import { Itasks, parse, setLocal } from "./utils";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { CompletedTasks } from "./components/CompletedTasks";

export default function Home() {
  const initialTasks: Itasks = { current: [], backlog: [] };
  const [tasks, setTasks] = useState<Itasks>(initialTasks);
  const [task, setTask] = useState<string>("");
  const [completed, setCompleted] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    setTasks(parse(localStorage.getItem("tasks") || "{}"));
    setCompleted(parse(localStorage.getItem("completed") || "{}"));
  }, []);
  useEffect(() => setLocal({ tasks, completed }), [tasks, completed]);

  const updateTasks = (updates: Partial<typeof tasks>) =>
    setTasks((prev) => ({ ...prev, ...updates }));

  const addTask = () =>
    task.trim() &&
    (updateTasks({ current: [...tasks.current, task.trim()] }), setTask(""));

  const moveTask = (from: keyof Itasks, to: keyof Itasks, index: number) => {
    const fromList = tasks[from];
    const toList = tasks[to];
    if (!fromList[index]) return;
    updateTasks({
      [from]: fromList.filter((_, i) => i !== index),
      [to]: [...toList, fromList[index]],
    });
  };

  const completeTask = (index: number) => {
    const today = new Date().toISOString().split("T")[0];
    const taskToComplete = tasks.current[index];
    if (!taskToComplete) return;
    updateTasks({ current: tasks.current.filter((_, i) => i !== index) });
    setCompleted((prev) => ({
      ...prev,
      [today]: [...(prev[today] || []), taskToComplete],
    }));
  };

  return (
    <main>
      <h1>TaskFlow</h1>
      <TaskInput task={task} setTask={setTask} addTask={addTask} />
      {(["current", "backlog"] as const).map((list) => (
        <TaskList
          key={list}
          type={list}
          tasks={tasks}
          moveTask={moveTask}
          completeTask={completeTask}
        />
      ))}
      <CompletedTasks completed={completed} />
    </main>
  );
}
