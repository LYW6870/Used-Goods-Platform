import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  IMutation,
  IMutationSendMessageArgs,
  IQuery,
  IQueryFetchMessagesArgs,
} from '../../../../commons/types/generated/types';
import ChatRoomUI from './ChatRoom.presenter';
import { FETCH_MESSAGES, SEND_MESSAGE } from './ChatRoom.queries';

// 추가로 ws 사용한 실시간 채팅
// 서로 다른 채팅방 2개를 열어놓고 해도 오류 발생 안하겠지? 확인하기.

export default function ChatRoom() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태 관리
  const [myId, setMyId] = useState(null);
  const { otherName } = router.query;
  const [otherUserName, setOtherUserName] = useState('');

  const { data: chatMessagesData } = useQuery<
    Pick<IQuery, 'fetchMessages'>,
    IQueryFetchMessagesArgs
  >(FETCH_MESSAGES, {
    variables: {
      accessToken,
      chatRoomId: Number(router.query.chatRoomId),
    },
  });

  const [sendMessageMutation] = useMutation<
    Pick<IMutation, 'sendMessage'>,
    IMutationSendMessageArgs
  >(SEND_MESSAGE);

  // 메시지 입력이 변경될 때 호출되는 함수
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value); // 입력된 값을 상태에 저장
  };

  const onClickSendMessage = async () => {
    if (message.trim() === '') {
      Modal.error({ content: '메시지를 입력하세요' });
      return;
    }

    try {
      await sendMessageMutation({
        variables: {
          chatRoomId: Number(router.query.chatRoomId),
          message,
          accessToken,
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }

    setMessage(''); // 메시지 전송 후 초기화
  };

  // localStorage에서 Access Token 과 userId 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('userData');

      if (!token || !userData) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
        router.push('/auth/login');
        return;
      }

      setAccessToken(token);
      setMyId(Number(JSON.parse(userData).id));
    }
  }, [router]);

  useEffect(() => {
    if (otherName) {
      setOtherUserName(String(otherName));
    }
  }, [otherName]);

  return (
    <ChatRoomUI
      chatMessagesData={chatMessagesData}
      onChangeMessage={onChangeMessage}
      onClickSendMessage={onClickSendMessage}
      myId={myId}
      message={message}
      otherUserName={otherUserName}
    />
  );
}
