import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $category: String) {
    fetchBoards(page: $page, category: $category) {
      _id
      category
      saleType
      isComplete
      title
      price
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($category: String) {
    fetchBoardsCount(category: $category)
  }
`;
