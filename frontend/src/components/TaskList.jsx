const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      {/* handle task not found  */}

      <ul>
        {tasks.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
