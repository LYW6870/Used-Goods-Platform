import styled from '@emotion/styled';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  width: 1300px;
  margin: 100px;
`;

// or TableContainer
export const Container = styled.div`
  //
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  //
  width: 100%;
  max-width: 1600px;
  margin: 100px;
`;

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px; // 최대 너비 제한
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;

  :hover {
    color: blue;
  }
`;

export const ColumnHeaderId = styled.div`
  width: 5%;
  text-align: center;
`;

export const ColumnId = styled.div`
  width: 5%;
  text-align: center;
`;

export const ColumnHeaderCategory = styled.div`
  width: 15%;
  text-align: center;
`;

export const ColumnCategory = styled.div`
  width: 15%;
  padding-left: 30px;
`;

export const ColumnHeaderIsComplete = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnIsComplete = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnHeaderSaleType = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnSaleType = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
  width: 32%;
  padding-left: 80px;
  cursor: pointer;

  :hover {
    color: blue;
  }
`;

export const ColumnTitle = styled.div`
  width: 32%;
  padding-left: 40px;
`;

export const ColumnHeaderPrice = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnPrice = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnHeaderDate = styled.div`
  width: 20%;
  text-align: center;
`;

export const ColumnDate = styled.div`
  width: 20%;
  text-align: center;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  margin: 10px 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  /* text-align: center; */
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Error = styled(Modal)``;
