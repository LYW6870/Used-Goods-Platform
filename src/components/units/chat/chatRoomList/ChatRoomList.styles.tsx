import styled from '@emotion/styled';
import { Modal } from 'antd';

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

export const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  min-height: 600px;
  width: 100%;
  padding: 10px;
  border: 1px solid #cc6349; // test를 위해 구분선
`;

export const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  height: 150px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid black; // test를 위해 구분선
`;

export const ChatRoomHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
  height: 50%;
  /* border: 1px solid black; // test를 위해 구분선 */
`;

export const ChatRoomHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  font-size: 25px;
  padding: 5px;
  width: 90%;
  height: 100%;
  /* border: 1px solid black; // test를 위해 구분선 */
`;

export const UnreadCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  padding: 5px;
  width: 10%;
  height: 100%;
  /* border: 1px solid black; // test를 위해 구분선 */
`;

export const ChatRoomBody = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 25px;
  padding: 10px;
  width: 100%;
  height: 50%;
  /* border: 1px solid black; // test를 위해 구분선 */
`;
export const Label = styled.label`
  margin-right: 15px;
`;

export const LabelName = styled.label`
  margin-right: 15px;
  font-weight: bold;
`;
export const LabelDate = styled.label`
  margin-right: 15px;
  color: gray;
`;

export const InputEdit = styled.input`
  font-size: 16px;
  color: blue;
  width: 100%;
  height: 100%;
  border: none;
  background: #ededed;
  text-align: left;

  &:focus {
    outline: none;
  }
`;

// 버튼 래퍼 스타일
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start; // 버튼을 왼쪽 정렬로 설정
  margin-top: 20px;
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

export const AddBtn = styled.button`
  margin: 0px;
  padding: 0px;
  width: 70px;
`;

export const AddressModal = styled(Modal)``;
