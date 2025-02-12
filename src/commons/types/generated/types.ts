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

export type IAccount = {
  __typename?: 'Account';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  localUserId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerUserId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type IAccountInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  localUserId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerUserId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
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

export type IChatMessage = {
  __typename?: 'ChatMessage';
  chatRoom: IChatRoom;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isRead: Scalars['Boolean']['output'];
  sender: IUser;
};

export type IChatRoom = {
  __typename?: 'ChatRoom';
  buyer: IUser;
  buyerLeft: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastMessageAt: Scalars['String']['output'];
  seller: IUser;
  sellerLeft: Scalars['Boolean']['output'];
};

export type IChatRoomSummary = {
  __typename?: 'ChatRoomSummary';
  buyer: IUser;
  id: Scalars['Int']['output'];
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastMessageAt?: Maybe<Scalars['String']['output']>;
  roomName?: Maybe<Scalars['String']['output']>;
  seller: IUser;
  unreadMessageCount: Scalars['Int']['output'];
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
  userName: Scalars['String']['input'];
};

export type ICreateLocalUserInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ICreateUserInput = {
  localUserId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type IKakaoTokenCheckResult = {
  __typename?: 'KakaoTokenCheckResult';
  error?: Maybe<Scalars['String']['output']>;
  expiresIn?: Maybe<Scalars['Int']['output']>;
  isValid: Scalars['Boolean']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  boardUpdateIsComplete?: Maybe<Scalars['Boolean']['output']>;
  createBoard?: Maybe<Scalars['Boolean']['output']>;
  createLocalUser?: Maybe<Scalars['Boolean']['output']>;
  deleteBoard?: Maybe<Scalars['Boolean']['output']>;
  kakaoLogin?: Maybe<IUser>;
  kakaoTokenCheck: IKakaoTokenCheckResult;
  loginLocalUser: Scalars['String']['output'];
  updateBoard?: Maybe<Scalars['Boolean']['output']>;
  updateUserData?: Maybe<Scalars['Boolean']['output']>;
  userLogout?: Maybe<Scalars['Boolean']['output']>;
};


export type IMutationBoardUpdateIsCompleteArgs = {
  boardId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};


export type IMutationCreateBoardArgs = {
  createBoardInput: ICreateBoardInput;
  token: Scalars['String']['input'];
};


export type IMutationCreateLocalUserArgs = {
  createUserInput?: InputMaybe<ICreateUserInput>;
};


export type IMutationDeleteBoardArgs = {
  boardId?: InputMaybe<Scalars['Int']['input']>;
  token: Scalars['String']['input'];
};


export type IMutationKakaoLoginArgs = {
  code: Scalars['String']['input'];
};


export type IMutationKakaoTokenCheckArgs = {
  accessToken: Scalars['String']['input'];
};


export type IMutationLoginLocalUserArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationUpdateBoardArgs = {
  boardId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
  updateBoardInput?: InputMaybe<IUpdateBoardInput>;
};


export type IMutationUpdateUserDataArgs = {
  token: Scalars['String']['input'];
  updateUserDataInput?: InputMaybe<IUpdateUserDataInput>;
};


export type IMutationUserLogoutArgs = {
  token: Scalars['String']['input'];
};

export type IQuery = {
  __typename?: 'Query';
  checkIdDuplication?: Maybe<Scalars['Boolean']['output']>;
  fetchBoard?: Maybe<IBoard>;
  fetchBoards?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsCount?: Maybe<Scalars['Int']['output']>;
  fetchUserData?: Maybe<IUserData>;
  fetchUserInfoData?: Maybe<IUserInfoData>;
  localTokenCheck2: Scalars['String']['output'];
  validateToken: Scalars['Int']['output'];
};


export type IQueryCheckIdDuplicationArgs = {
  localUserId: Scalars['String']['input'];
};


export type IQueryFetchBoardArgs = {
  boardId?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  checkComplete?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchBoardsCountArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  checkComplete?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchUserDataArgs = {
  token: Scalars['String']['input'];
};


export type IQueryFetchUserInfoDataArgs = {
  token: Scalars['String']['input'];
};


export type IQueryLocalTokenCheck2Args = {
  id: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type IQueryValidateTokenArgs = {
  token: Scalars['String']['input'];
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

export type IUpdateUserDataInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type IUser = {
  __typename?: 'User';
  account: IAccount;
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type IUserData = {
  __typename?: 'UserData';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type IUserInfoData = {
  __typename?: 'UserInfoData';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};
