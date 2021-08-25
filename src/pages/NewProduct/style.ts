import styled from "styled-components";

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 50%;
  max-width: 700px;
  .loginBox {
    position: relative;
    padding: 1rem;
  }
  input.animation {
    width: 20rem;
    height: 4rem;
    padding: 1.25rem; //20px
    font-size: 1.5rem; //24px
    color: #000;
    outline: none;
    border: 2px solid #bbb;
  }
  span {
    position: absolute;
    top: 1.25rem;
    left: 1.563rem;
    font-size: 1.563rem;
    letter-spacing: 0.05em;
    pointer-events: none;
    font-weight: bold;
    transition: 0.4s;
    color: #bbb;
  }
  input.animation:focus {
    border: none;
    outline: 2px solid #bbb;
  }
  input.animation:focus + span,
  input.animation:valid + span {
    top: -0.75rem;
    left: 0.675rem;
    font-size: 1.25rem;
    padding: 0 0.675rem;
    background: #fff;
  }
  input[type="submit"] {
    width: 20rem;
    height: 4rem;
    background-color: green;
    height: 4rem;
    color: #fff;
    border-radius: 0.25rem;
    border: none;
    font-weight: 400;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
