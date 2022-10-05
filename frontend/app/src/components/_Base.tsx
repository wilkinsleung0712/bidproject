import styled from "styled-components";

export const Layout = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    margin: 20px 20px;
    gap: 16px;
`

export const Container = styled.div`
  width: calc(100% - 40px);
  margin: 20px 20px;
  overflow-x: hidden;
`;


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
