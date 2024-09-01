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
// @@@@@@@@@@@@@@@@@@@
// 새로고침시 userId null이되는 오류, 기타 새로고침시 발생하는 오류 확인하고 고칠 수 있으면 고치기
// @@@@@@@@@@@@@@@@@@@
// WebSocket 서버 URL
const WS_URL = 'ws://localhost:4000'; //

export default function ChatRoom() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태 관리
  const [myId, setMyId] = useState(null);
  const { otherName } = router.query;
  const [otherUserName, setOtherUserName] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket 객체 상태 관리
  const chatRoomId = Number(router.query.chatRoomId);

  const { data: chatMessagesData, refetch } = useQuery<
    Pick<IQuery, 'fetchMessages'>,
    IQueryFetchMessagesArgs
  >(FETCH_MESSAGES, {
    variables: {
      accessToken,
      chatRoomId,
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

      // WebSocket을 통해 실시간 메시지 전송 알림
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            chatRoomId: Number(router.query.chatRoomId),
            senderId: myId,
          }),
        );
      }

      // refetch({ accessToken, chatRoomId: Number(router.query.chatRoomId) });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }

    setMessage(''); // 메시지 전송 후 초기화
  };

  useEffect(() => {
    if (accessToken) {
      const socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = async (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          console.log('Received:', receivedMessage);

          if (chatRoomId) {
            // refetch 호출 전에 chatRoomId가 유효한지 확인
            console.log('Refetching messages...');
            await refetch({
              accessToken,
              chatRoomId, // chatRoomId 사용
            });
            console.log('Refetch completed');
          } else {
            console.error('chatRoomId is null or undefined');
          }
        } catch (error) {
          console.error('Refetch error:', error.message);
          if (error.networkError) {
            console.error('Network Error:', error.networkError);
          }
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((err) =>
              console.error('GraphQL Error:', err),
            );
          }
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setWs(null);
      };

      setWs(socket);

      return () => {
        console.log('Cleaning up WebSocket connection...');
        if (
          socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING
        ) {
          socket.close();
        }
      };
    }
    return undefined; // accessToken이 없는 경우에 명시적으로 undefined 반환
  }, [accessToken]); // accessToken이 설정된 후에만 WebSocket 연결 시도

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
