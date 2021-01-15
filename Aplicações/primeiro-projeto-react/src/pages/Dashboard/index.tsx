import React, { useState, useEffect, FormEvent } from 'react';
// React Icons/fi = https://feathericons.com/
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
  // Dizendo que esse useState é um Array de Repository, sempre que nos criamos um estado que não é um valor padrão como uma string ou number, devemos definir o tipo desse estado, pra que depois quando nos formos usar esse estado nos sabermos o tipo dele
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      // JSON.parse pega um valor e transforma em Array
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      // JSON.stringify pega um valor e transforma em String
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    try {
      // Tipando os Dados Retornados como um Repository no Axios
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
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
