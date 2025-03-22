import { Itasks } from "../utils";

interface ITaskActions {
  type: keyof Itasks;
  index: number;
  moveTask: (from: keyof Itasks, to: keyof Itasks, index: number) => void;
  completeTask: (index: number) => void;
}
export const TaskActions = (props: ITaskActions) => {
  const { type, index, moveTask, completeTask } = props;
  return (
    <div>
      {type === "current" && (
        <>
          <button
            className="actionBtn"
            onClick={() => moveTask("current", "backlog", index)}
          >
            → Backlog
          </button>
          <button className="actionBtn" onClick={() => completeTask(index)}>
            ✅ Done
          </button>
        </>
      )}
      {type === "backlog" && (
        <button
          className="actionBtn"
          onClick={() => moveTask("backlog", "current", index)}
        >
          ← Current
        </button>
      )}
    </div>
  );
};
