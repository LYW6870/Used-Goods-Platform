import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  margin: 100px;
  padding: 100px;
  border: none;
  box-shadow: 0px 0px 10px gray;
  background-color: #fff;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  border: 1px solid #ece8e8;
  border-radius: 8px;
`;

// 제목 스타일
export const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
  padding-left: 15px;
`;

// 테이블 스타일
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 15px 20px;
    border-bottom: 1px solid #ffffff;
    text-align: left;
  }

  th {
    background-color: #cccccc;
    font-weight: bold;
    border-right: 1px solid #ffffff;
    width: 200px;
  }

  td {
    background-color: #ededed;
  }

  tr:last-child th,
  tr:last-child td {
    border-bottom: none; /* 마지막 행 아래쪽에는 경계선을 제거 */
  }
`;

// 버튼 래퍼 스타일
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start; // 버튼을 왼쪽 정렬로 설정
  gap: 10px;
  margin-top: 20px;
  padding-left: 15px; // 버튼이 테이블과 정렬되도록 약간의 패딩 추가
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;
