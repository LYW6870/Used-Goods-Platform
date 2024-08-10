import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
  query fetchBoards(
    $page: Int
    $category: String
    $checkComplete: Boolean
    $searchTerm: String
  ) {
    fetchBoards(
      page: $page
      category: $category
      checkComplete: $checkComplete
      searchTerm: $searchTerm
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
  query fetchBoardsCount(
    $category: String
    $checkComplete: Boolean
    $searchTerm: String
  ) {
    fetchBoardsCount(
      category: $category
      checkComplete: $checkComplete
      searchTerm: $searchTerm
    )
  }
`;
