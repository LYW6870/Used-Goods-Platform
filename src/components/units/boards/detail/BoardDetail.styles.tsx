import styled from '@emotion/styled';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 100px;
  padding: 100px;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const BodyContainer = styled.div`
  width: 100%;
  max-width: 700px; // 최대 너비 제한
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ece8e8;
  border-radius: 8px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  background-color: #fbf3f3;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3px;
  margin-bottom: 10px;
  border-top: 1px solid #bbb5b5;
  border-bottom: 1px solid #bbb5b5;
`;

export const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ece8e8;
  border-radius: 2px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.button`
  height: 50px;
  width: 20%;
  margin-right: 7%;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: #0056b3;
  }
`;

export const Text1 = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Text2 = styled.label`
  width: 80px;
  text-align: center;
  font-size: 18px;
  background-color: #6cc06c;
  border-radius: 8px;
  font-weight: bold;
`;

export const ContextHtml = styled.html`
  margin-bottom: 10px;
  font-size: 18px;

  // 이미지 사이즈 제한
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const Error = styled.label`
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  color: red;
`;

export const AddModal = styled(Modal)``;
