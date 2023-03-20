import styled, { css } from 'styled-components';

const borderCss = css`
  border: 1px solid grey;
  border-radius: 4px;
`;

export const Wrapper = styled.div`
  width: 15rem;
  display: flex;
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${borderCss}
`;

export const List = styled.ul`
  max-height: 10rem;
  overflow-y: auto;
  padding: 0;
  margin: 0rem 1rem 1rem;
`;

export const Item = styled.li`
  list-style: none;
`;

export const Input = styled.input`
  padding: 0;
  margin: 1rem;
`;

export const Button = styled.div`
  text-align: center;

  width: 100%;
  padding: 1rem 2rem;

  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${borderCss}
`;
