import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components"

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");//in ec2 replace localhost with public ip of ec2
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    await axios.post("http://localhost:5000/tasks", { task: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container" style={{display:"flex",flexDirection:"column",alignItems:"center",alignContent:"center",width:"100vw",height:"100vh"}}>
      <h1 style={{color:"blueviolet"}}>TODO App</h1>
      <div className="input-section" style={{display:"flex",flexDirection:"column",alignItems:"center",alignContent:"center",width:"100vw",height:"70px"}}>
        <Input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <Button onClick={addTask}> Add Task </Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task} <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Input = styled.input`
height: 30px;
width: 250px;
background-color:whitesmoke;
border-radius: 1ch;
`
const Button = styled.div`
background-color: aliceblue;
height: 40px;
width: 80px;
display: flex;
align-items: center;
align-content: space-around;
border-radius:1ch;
margin-top: 7px;
`
