import styled from '@emotion/styled';
// import { Modal } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1600px; // 400 * 4  + 패딩 100씩 200 + 여유분 200
  margin: 100px;
  padding: 100px;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  border: 1px solid #ece8e8;
  border-radius: 8px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 12.5px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const Label = styled.label`
  font-size: 18px;
`;

export const TitleLabel = styled.label`
  font-size: 18px;
  display: -webkit-box; // 플렉스박스를 사용하여 컨테이너를 설정
  -webkit-line-clamp: 2; // 표시할 줄 수 설정
  -webkit-box-orient: vertical; // 세로 방향으로 정렬
  overflow: hidden; // 넘치는 텍스트를 숨김
  text-overflow: ellipsis; // 넘치는 텍스트를 말줄임표로 표시
  max-width: 300px; // 최대 너비 설정
`;

export const CategorySelect = styled.select`
  margin-left: 15px;
  margin-right: 20px;
  width: 130px;
  height: 25px;
  border-radius: 4px;
  font-size: 15px;
`;

export const Checkbox = styled.input`
  margin-left: 10px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const BoardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
  height: 200px;
  padding: 10px;
`;

export const BoardImage = styled.img`
  width: 50%;
  height: 100%;
  border: 1px solid black;
  /* object-fit: scale-down; */
`;

export const BoardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50%;
  height: 100%;
  margin-left: 10px;
  padding-bottom: 5px;

  & > * {
    margin-bottom: 10px;
  }
  :last-child {
    margin-bottom: 0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 13px;
`;

export const SearchInput = styled.input`
  width: 260px;
  height: 30px;
  padding-left: 5px;
  border-radius: 4px;
  font-size: 15px;
`;

export const SearchButton = styled.button`
  height: 30px;
  width: 50px;
  padding: 5px 10px;
  margin-left: 5px;
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

// export const Error = styled(Modal)``;
