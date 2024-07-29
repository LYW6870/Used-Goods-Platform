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
  address?: Maybe<Scalars['String']['output']>;
  addressDetail?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  contents: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isComplete: Scalars['Boolean']['output'];
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  userName: Scalars['String']['output'];
};

export type ICreateBoardInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressDetail?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  contents: Scalars['String']['input'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isComplete: Scalars['Boolean']['input'];
  price: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  userName: Scalars['String']['input'];
};

export type ICreateUserInput = {
  name: Scalars['String']['input'];
  socialAccount?: InputMaybe<ISocialAccountInput>;
};

export type IMutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<Scalars['Int']['output']>;
  deleteBoard?: Maybe<Scalars['Boolean']['output']>;
  kakaoLogin?: Maybe<IUser>;
  kakaoTokenCheck?: Maybe<Scalars['Boolean']['output']>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  testAPIcreateUser?: Maybe<Scalars['Int']['output']>;
  updateBoard?: Maybe<IBoard>;
  updateIsComplete?: Maybe<Scalars['Boolean']['output']>;
};


export type IMutationCreateBoardArgs = {
  createBoardInput?: InputMaybe<ICreateBoardInput>;
};


export type IMutationDeleteBoardArgs = {
  boardId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationKakaoLoginArgs = {
  code: Scalars['String']['input'];
};


export type IMutationKakaoTokenCheckArgs = {
  accessToken: Scalars['String']['input'];
};


export type IMutationLogoutUserArgs = {
  accessToken: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationTestApIcreateUserArgs = {
  createUserInput?: InputMaybe<ICreateUserInput>;
};


export type IMutationUpdateBoardArgs = {
  boardId: Scalars['Int']['input'];
  updateBoardInput?: InputMaybe<IUpdateBoardInput>;
  userId: Scalars['Int']['input'];
};


export type IMutationUpdateIsCompleteArgs = {
  boardId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard?: Maybe<IBoard>;
  fetchBoards?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsCount?: Maybe<Scalars['Int']['output']>;
  getUser?: Maybe<IUser>;
};


export type IQueryFetchBoardArgs = {
  boardId?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsCountArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type ISocialAccount = {
  __typename?: 'SocialAccount';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  provider: Scalars['String']['output'];
  providerUserId: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type ISocialAccountInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerUserId: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateBoardInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressDetail?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isComplete?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUser = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  socialAccount: ISocialAccount;
  updatedAt: Scalars['String']['output'];
};
