import styled, { css } from 'styled-components';

const baseWidth = css`
  width: 15rem;
`;

export const Wrapper = styled.div`
  ${baseWidth}
`;

export const ContentWrapper = styled.div`
  ${baseWidth}
  border: 1px solid red;
`;

export const List = styled.ul`
  max-height: 10rem;
  overflow-y: auto;
`;

export const Input = styled.input`
  width: 100%;
`;

export const Button = styled.div`
  text-align: center;
  padding: 1rem 2rem;

  cursor: pointer;

  ${baseWidth}
  height: 2rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid black;
`;
