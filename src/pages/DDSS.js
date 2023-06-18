import React, { useState } from "react";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", partition: "do-now" },
    { id: 2, title: "Task 2", partition: "delegate" },
    { id: 3, title: "Task 3", partition: "stop-park" },
    { id: 4, title: "Task 4", partition: "delete" },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = Math.max(...tasks.map((task) => task.id)) + 1;
    const newTaskObj = { id: newId, title: newTask, partition: "do-now" };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, partition) => {
    const taskId = event.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task.id === parseInt(taskId)) {
        return { ...task, partition };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="kanban-board" style={{ display: "flex", height: "100%" }}>
    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "do-now")}>
      <h3>Do Now</h3>
      {tasks.filter((task) => task.partition === "do-now").map((task) => (
        <div className="kanban-task" key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
          {task.title}
        </div>
      ))}
    </div>
    <div className="vertical-divider" style={{ width: "1px", background: "#000000" }}></div>
    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "delegate")}>
      <h3>Delegate</h3>
      {tasks.filter((task) => task.partition === "delegate").map((task) => (
        <div className="kanban-task" key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
          {task.title}
        </div>
      ))}
    </div>
    <div className="horizontal-divider"style={{ width: "1px", background: "#000000" }}></div>
    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "stop-park")}>
      <h3>Stop/Park</h3>
      {tasks.filter((task) => task.partition === "stop-park").map((task) => (
        <div className="kanban-task" key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
          {task.title}
        </div>
      ))}
    </div>
    <div className="vertical-divider"style={{ width: "1px", background: "#000000" }}></div>
    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "delete")}>
      <h3>Delete</h3>
      {tasks.filter((task) => task.partition === "delete").map((task) => (
        <div className="kanban-task" key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
          {task.title}
        </div>
      ))}
    </div>
  </div>


  )};


  export default KanbanBoard



     
