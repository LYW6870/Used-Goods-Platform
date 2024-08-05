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
  border: 1px solid #9d2b2b;
  /* border: 1px solid #ece8e8; */
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
  display: -webkit-box; /* 플렉스박스를 사용하여 컨테이너를 설정 */
  -webkit-line-clamp: 2; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 말줄임표로 표시 */
  max-width: 300px; /* 최대 너비 설정 */
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
  justify-content: space-between;
`;

export const BoardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 150px;
  padding: 10px;
`;

export const BoardImage = styled.img`
  width: 50%;
  height: 100%;
  src: '../../../../../../public/ImageNone.png';
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

// export const TableContainer = styled.div`
//   width: 100%;
//   max-width: 1200px; // 최대 너비 제한
//   margin: 50px auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
// `;

// export const TableTop = styled.div`
//   border-top: 2px solid gray;
//   margin-top: 20px;
// `;

// export const TableBottom = styled.div`
//   border-bottom: 2px solid gray;
// `;

// export const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: 52px;
//   line-height: 52px;
//   border-bottom: 1px solid gray;

//   :hover {
//     color: blue;
//   }
// `;

// export const ColumnHeaderId = styled.div`
//   width: 5%;
//   text-align: center;
// `;

// export const ColumnId = styled.div`
//   width: 5%;
//   text-align: center;
// `;

// export const ColumnHeaderCategory = styled.div`
//   width: 15%;
//   text-align: center;
// `;

// export const ColumnCategory = styled.div`
//   width: 15%;
//   padding-left: 30px;
// `;

// export const ColumnHeaderIsComplete = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnIsComplete = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnHeaderSaleType = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnSaleType = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnHeaderTitle = styled.div`
//   width: 32%;
//   padding-left: 80px;
//   cursor: pointer;

//   :hover {
//     color: blue;
//   }
// `;

// export const ColumnTitle = styled.div`
//   width: 32%;
//   padding-left: 40px;
// `;

// export const ColumnHeaderPrice = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnPrice = styled.div`
//   width: 10%;
//   text-align: center;
// `;

// export const ColumnHeaderDate = styled.div`
//   width: 20%;
//   text-align: center;
// `;

// export const ColumnDate = styled.div`
//   width: 20%;
//   text-align: center;
// `;

// export const FormField = styled.div`
//   margin-bottom: 20px;
// `;

// export const ButtonContainer = styled.div`
//   margin: 10px 50px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;

// export const Button = styled.button`
//   padding: 10px 20px;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 4px;
//   /* text-align: center; */
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// export const PaginationContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;

// export const Error = styled(Modal)``;
