import { Itasks } from "../utils";
import { TaskActions } from "./TaskActions";

interface ITaskList {
  type: keyof Itasks;
  tasks: Itasks;
  moveTask: (from: keyof Itasks, to: keyof Itasks, index: number) => void;
  completeTask: (index: number) => void;
}
export const TaskList = (props: ITaskList) => {
  const { type, tasks, moveTask, completeTask } = props;
  return (
    <section>
      <h2>
        {type.charAt(0).toUpperCase() + type.slice(1)} ({tasks[type].length})
      </h2>
      <ul>
        {tasks[type].map((task, index) => (
          <li key={index}>
            {task}
            <TaskActions
              type={type}
              index={index}
              moveTask={moveTask}
              completeTask={completeTask}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
