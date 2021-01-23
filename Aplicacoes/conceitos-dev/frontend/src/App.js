import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then(response => {
      setProjects(response.data);
    });
  }, []);

 async function handleAddProject() {
   const response = await api.post("projects", {
      title: `New Project ${Date.now()}`,
      owner: "Daniel",
    });

    const project = response.data

    setProjects([...projects, project]);
  }

  return (
    <div className="divzola">
      <Header title='Projects'>
        <ul className="ulzola">
          {projects.map(project => (
            <li key={project.id} className="lizola">{project.title}</li>
          ))}
        </ul>
      </Header>

      <button type='button' className='buttonzola' onClick={handleAddProject}>
        Adicionar
      </button>

    </div>
  );
}

// Códigos que foram apagados pelo Diego:

/*
import BackgroundImage from "./assets/img.jpg"

<img width={300} src={BackgroundImage} align="float"/>

<Header title='World' />

setProjects([...projects, `New Project ${Date.now()}`]);

*/
