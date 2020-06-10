import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);


  async function handleAddRepository() {
    // TODO
    const res = await api.post('/repositories', {
      title: `Repositorio ${Date.now()}`,
      url: 'https://github.com/pedrosouza44/VUTTR-front-end',
      techs: [ 'ReactJS', 'React Native', 'NodeJS', 'AngularJS', 'CSS', 'HTML5' ]
    });

    const repositorie = res.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const res = await api.delete(`/repositories/${id}`);

    const repositorie = repositories.filter(repo => repo.id !== id);

    setRepositories(repositorie);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;