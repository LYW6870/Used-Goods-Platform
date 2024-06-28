export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type IBoard = {
  __typename?: 'Board';
  _id: Scalars['Int']['output'];
  category: Scalars['String']['output'];
  contents: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  isComplete: Scalars['Boolean']['output'];
  location?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  saleType: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  writer: Scalars['String']['output'];
};

export type ICreateBoardInput = {
  category: Scalars['String']['input'];
  contents: Scalars['String']['input'];
  isComplete: Scalars['Boolean']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  saleType: Scalars['String']['input'];
  title: Scalars['String']['input'];
  writer: Scalars['String']['input'];
};

export type IMutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<Scalars['Int']['output']>;
  updateBoard?: Maybe<IBoard>;
};


export type IMutationCreateBoardArgs = {
  createBoardInput?: InputMaybe<ICreateBoardInput>;
};


export type IMutationUpdateBoardArgs = {
  boardId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  updateBoardInput?: InputMaybe<IUpdateBoardInput>;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard?: Maybe<IBoard>;
  fetchBoards?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsCount?: Maybe<Scalars['Int']['output']>;
};


export type IQueryFetchBoardArgs = {
  boardId?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchBoardsCountArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateBoardInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  isComplete?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  saleType?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};
