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
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();

  const { data: chatRoomListData } = useQuery<
    Pick<IQuery, 'fetchChatRooms'>,
    IQueryFetchChatRoomsArgs
  >(FETCH_CHAT_ROOMS, { variables: { accessToken } });

  const onClickChatRoom = (event: React.MouseEvent<HTMLDivElement>) => {
    // router.push(`/chat/${event.currentTarget.id}`);

    const chatRoomId = event.currentTarget.id;
    const otherName = event.currentTarget.getAttribute('data-othername'); // roomName을 가져옵니다.

    // roomName을 쿼리 파라미터로 전달
    router.push(
      `/chat/${chatRoomId}?otherName=${encodeURIComponent(otherName)}`,
    );
  };

  // localStorage에서 Access Token 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (accessToken === null) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
      } else {
        setAccessToken(localStorage.getItem('accessToken'));
      }
    }
  }, []);
  return (
    <ChatRoomListUI
      chatRoomListData={chatRoomListData}
      onClickChatRoom={onClickChatRoom}
    />
  );
}
