import React, { useState, FormEvent } from 'react';
// React Icons/fi = https://feathericons.com/
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

// Na Interface é nescessário declarar apenas os campos utilizados
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
      // Adição de um Novo Repository
      // Consumir Api do Github
      // Salvar no Storage
    } catch (err) {
      setInputError(`O Repositório ${newRepo} não existe`);
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Repositórios no Github</Title>

      {/*
       Duas Formas de Converter Valores como String, Number, Object, Array, etc... Para Boolean
       A Primeira é Como eu Fiz e Podemos Ver abaixo no Form Propriedade hasError, passando Boolean(valor)
       caso o inputError seja vazio hasError será false, caso ele não seja vazio, ele vai retornar true
       Também poderíamos fazer dessa forma !!inputError, o efeito seria o mesmo
      */}
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* Abaixo temos um If Simplificado usamos o && pois a segunda parte só vai ser executado caso a primeira for satisfeita */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="https://github.com">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
