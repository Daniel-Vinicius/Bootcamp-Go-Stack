import styled, { css } from 'styled-components';
// Polished é uma Lib para se trabalhar com cores
import { shade } from 'polished';

// Passando Novas Propriedades a elementos HTML via Styled Components Crio uma interface
interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

// Passando Novas Propriedades a elementos HTML via Styled Components Passo a Interface Aqui
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0px 0px 5px;
    color: #3a3a3a;
    border: solid 2px #fff;
    border-right: 0;

    /*
    Usando as Props de Componentes Via Styled Components
    Faço da segunte maneira:
    Primeiro importo o css do styled components
    import styled, { css } from 'styled-components';
    depois Faço algo parecido a abaixo, about é a propriedade do form,
    o && simboliza caso essa propriedade esteja preenchida aplique o estilo dentro de css
      ${(props) =>
      props.about &&
      css`
        border-color: #c53030;
      `}
    */

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    // O & Comercial representa o elemento atual no caso input
    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    // A função shade diminui o brilho, no caso ela diminuiu 20%
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;

    &:hover {
      transition: 0.2s;
      transform: translateX(10px);
    }

    // O seletor abaixo estiliza todos os elementos (a) que ficam depois desse elemento que no caso é (a) também
    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    // o seletro svg quase sempre consegue estilizar todos os ícones
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
