import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $category: String, $checkComplete: Boolean) {
    fetchBoards(
      page: $page
      category: $category
      checkComplete: $checkComplete
    ) {
      id
      isComplete
      title
      price
      images
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($category: String) {
    fetchBoardsCount(category: $category)
  }
`;
