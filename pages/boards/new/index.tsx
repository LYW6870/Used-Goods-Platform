import styled from '@emotion/styled';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  width: 1200px;
  border: 1px solid black;
  margin: 100px;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const Error = styled(Modal)``;

export default function BoardsNewPage() {
  return (
    <Wrapper>
      DB 연동 확인용 <input type="text"></input>
      <button>확인</button>
    </Wrapper>
  );
}
