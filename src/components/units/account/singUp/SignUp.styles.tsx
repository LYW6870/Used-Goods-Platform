import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1600px;
  margin: 100px;
  padding: 100px;
  border: none;

  box-shadow: 0px 0px 10px gray;
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 100px auto;
  padding: 50px;
  border: none;
  border: 1px solid #c6bdbd;
  background-color: white;
`;

// 회원가입 타이틀
export const SignUpTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const Label = styled.label`
  width: 100%;
  margin-bottom: 15px; // 바꿔도 적용 안되는듯?
  font-size: 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-right: 10px;
  margin-top: 15px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;
export const CheckButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #31b971;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2d9e62;
  }
`;

export const SignUpButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #31b971;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    background-color: #2d9e62;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;
