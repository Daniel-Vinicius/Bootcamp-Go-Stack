import React from 'react';
// React Icons/fi = https://feathericons.com/
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/66279500?s=460&u=03d962bd1fda436ca49d4bbfbf2f30bdd566221d&v=4"
            alt="Daniel Vinícius"
          />
          <div>
            <strong>Daniel-Vinicius/CSS</strong>
            <p>🎨 Repositório de um Curso de CSS com 55 aulas e completo.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/66279500?s=460&u=03d962bd1fda436ca49d4bbfbf2f30bdd566221d&v=4"
            alt="Daniel Vinícius"
          />
          <div>
            <strong>Daniel-Vinicius/CSS</strong>
            <p>🎨 Repositório de um Curso de CSS com 55 aulas e completo.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/66279500?s=460&u=03d962bd1fda436ca49d4bbfbf2f30bdd566221d&v=4"
            alt="Daniel Vinícius"
          />
          <div>
            <strong>Daniel-Vinicius/CSS</strong>
            <p>🎨 Repositório de um Curso de CSS com 55 aulas e completo.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/66279500?s=460&u=03d962bd1fda436ca49d4bbfbf2f30bdd566221d&v=4"
            alt="Daniel Vinícius"
          />
          <div>
            <strong>Daniel-Vinicius/CSS</strong>
            <p>🎨 Repositório de um Curso de CSS com 55 aulas e completo.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
