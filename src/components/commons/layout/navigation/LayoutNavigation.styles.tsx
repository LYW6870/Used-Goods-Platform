import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1600px;
  margin-top: 30px;
  margin-left: 100px;
  border: none;
  height: 40px;
  background-color: #658ad3;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 1600px;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const NavItem = styled.div`
  font-family: 'SunBatang-Light';
  margin-right: 30px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #abd7d7;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  font-size: 18px;
  font-weight: 700;

  // 약간 보기 불편해서 아래두줄 추가함(글씨가 살짝 아래로 치우쳐져있어서)
  position: relative;
  top: -1px;
`;
