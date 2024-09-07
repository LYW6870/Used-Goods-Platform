import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FETCH_CHAT_ROOMS } from './ChatRoomList.queries';
import {
  IQuery,
  IQueryFetchChatRoomsArgs,
} from '../../../../commons/types/generated/types';
import ChatRoomListUI from './ChatRoomList.presenter';

export default function ChatRoomList() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const { data: chatRoomListData, refetch } = useQuery<
    Pick<IQuery, 'fetchChatRooms'>,
    IQueryFetchChatRoomsArgs
  >(FETCH_CHAT_ROOMS, { variables: { accessToken }, skip: !accessToken });

  const onClickChatRoom = (event: React.MouseEvent<HTMLDivElement>) => {
    const chatRoomId = event.currentTarget.id;

    if (chatRoomId) {
      router.push(`/chat/${chatRoomId}`);
    } else {
      Modal.error({ content: '정상적이지 않은 접근입니다.' });
    }
  };

  // localStorage에서 Access Token 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token === null) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
      } else {
        setAccessToken(token);
      }
    }
  }, []);

  // Access Token이 변경되었을 때 쿼리 재실행
  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  return (
    <ChatRoomListUI
      chatRoomListData={chatRoomListData}
      onClickChatRoom={onClickChatRoom}
    />
  );
}
