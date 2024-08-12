import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1600px;
  margin-left: 100px;
  border: none;
  height: 40px;
  background-color: #98eb9c;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: space-between;
  align-items: center;
  width: 1600px;
  height: 100%;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:active {
    background-color: #f6f6f6;
  }
`;

export const Introduction = styled.label`
  font-family: 'SunBatang-Light';
  width: 30%;
  margin: 0 10px;
  font-size: 18px;
  font-weight: 700;

  // 약간 보기 불편해서 아래두줄 추가함(글씨가 살짝 아래로 치우쳐져있어서)
  position: relative;
  top: -1px;
`;

export const Label = styled.label`
  line-height: 16px;
  font-size: 18px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 70%;
  height: 100%;
`;

export const ItemContainer = styled.div`
  padding: 0 10px;
`;
