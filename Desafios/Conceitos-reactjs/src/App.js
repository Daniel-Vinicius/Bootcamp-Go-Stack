import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // const [techs, setTechs] = useState([]);

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleUrl = event => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: title,
      techs: ["Node.js", "React"],
      url: url,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              <a
                href={`https://${repository.url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repository.title}
              </a>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <input
        type='text'
        placeholder='Nome Do Repositório'
        onChange={handleTitle}
        value={title}
      />
      <input
        type='text'
        readOnly={false}
        placeholder='URL Do Repositório sem HTTP'
        onChange={handleUrl}
        value={url}
      />

      <button id='adicionar' onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
