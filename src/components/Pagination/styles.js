// Packages:
import styled from 'styled-components'


// Exports:
export const Wrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`


export const PageInput = styled.input`
  width: 50px;
  border: 1px solid rgba(0,0,0,.1);
  border-bottom: 2px solid #a9a9a9;

  &:hover {
    border-bottom: 2px solid #000000;
    transition: all .25s ease;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #000000;
    transition: all .25s ease;
  }
`