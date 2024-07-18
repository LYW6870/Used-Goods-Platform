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

export const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-right: 20px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 700px; // 최대 너비 제한
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const InlineFieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;

  // 마지막 필드는 오른쪽 간격 제거
  &:last-child {
    margin-right: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const Error = styled(Modal)``;
