interface ITaskInput {
  task: string;
  setTask: (value: string) => void;
  addTask: () => void;
}
export const TaskInput = (props: ITaskInput) => {
  const { task, setTask, addTask } = props;
  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button className="addBtn" onClick={addTask}>
        Add
      </button>
    </div>
  );
};
