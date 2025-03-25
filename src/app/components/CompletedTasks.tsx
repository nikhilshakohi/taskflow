interface CompletedTasksProps {
  completed: Record<string, string[]>;
}
export const CompletedTasks = ({ completed }: CompletedTasksProps) => (
  <section className="completed-section">
    {Object.keys(completed).length === 0 ? (
      <div />
    ) : (
      <div>
        <h2>Completed ({Object.values(completed).flat().length})</h2>
        {Object.entries(completed).map(([date, taskList]) => (
          <div key={date} className="completed-group">
            <h3 className="completed-date">📅 {date}</h3>
            <ul className="completed-tasks">
              {taskList.map((task, index) => (
                <li key={index} className="completed-task">
                  ✅ {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </section>
);
