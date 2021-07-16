import styled from 'styled-components';

const Box = styled.div`
  background: #202024;
  color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .linkTitle {
    font-family: Verdana;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #2E7BB4;
    margin-top: 13px
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #121214;
  }
  input {
    width: 100%;
    background-color: #5A5A5A;
    color: #ffffff;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #fafafa;
      opacity: 0.5;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #7e489c;
  }
`; 

export default Box