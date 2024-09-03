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
  createChatRoom?: Maybe<Scalars['Int']['output']>;
  deleteBoard?: Maybe<Scalars['Boolean']['output']>;
  kakaoLogin?: Maybe<IUser>;
  kakaoTokenCheck?: Maybe<Scalars['Boolean']['output']>;
  leaveChatRoom?: Maybe<Scalars['Boolean']['output']>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  markMessagesAsRead?: Maybe<Scalars['Boolean']['output']>;
  sendMessage?: Maybe<Scalars['Boolean']['output']>;
  testAPIcreateUser?: Maybe<Scalars['Int']['output']>;
  updateBoard?: Maybe<IBoard>;
  updateIsComplete?: Maybe<Scalars['Boolean']['output']>;
  updateUserData?: Maybe<Scalars['Boolean']['output']>;
};


export type IMutationCreateBoardArgs = {
  createBoardInput?: InputMaybe<ICreateBoardInput>;
};


export type IMutationCreateChatRoomArgs = {
  accessToken: Scalars['String']['input'];
  sellerId: Scalars['Int']['input'];
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


export type IMutationLeaveChatRoomArgs = {
  accessToken: Scalars['String']['input'];
  chatRoomId: Scalars['Int']['input'];
};


export type IMutationLogoutUserArgs = {
  accessToken: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationMarkMessagesAsReadArgs = {
  accessToken: Scalars['String']['input'];
  chatRoomId: Scalars['Int']['input'];
};


export type IMutationSendMessageArgs = {
  accessToken: Scalars['String']['input'];
  chatRoomId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
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


export type IMutationUpdateUserDataArgs = {
  accessToken: Scalars['String']['input'];
  updateUserDataInput?: InputMaybe<IUpdateUserDataInput>;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard?: Maybe<IBoard>;
  fetchBoards?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsCount?: Maybe<Scalars['Int']['output']>;
  fetchChatRoom?: Maybe<IChatRoom>;
  fetchChatRooms: Array<IChatRoomSummary>;
  fetchMessages: Array<IChatMessage>;
  fetchUserData?: Maybe<IUserData>;
  fetchUserInfoData?: Maybe<IUserInfoData>;
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


export type IQueryFetchChatRoomArgs = {
  accessToken: Scalars['String']['input'];
  chatRoomId: Scalars['Int']['input'];
};


export type IQueryFetchChatRoomsArgs = {
  accessToken: Scalars['String']['input'];
};


export type IQueryFetchMessagesArgs = {
  accessToken: Scalars['String']['input'];
  chatRoomId: Scalars['Int']['input'];
};


export type IQueryFetchUserDataArgs = {
  accessToken: Scalars['String']['input'];
};


export type IQueryFetchUserInfoDataArgs = {
  accessToken: Scalars['String']['input'];
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

export type IUpdateUserDataInput = {
  address?: InputMaybe<Scalars['String']['input']>;
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

export type IUserData = {
  __typename?: 'UserData';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  socialAccount: ISocialAccount;
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
  socialAccount: ISocialAccount;
  updatedAt: Scalars['String']['output'];
};
