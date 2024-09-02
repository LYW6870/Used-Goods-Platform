import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  IMutation,
  IMutationMarkMessagesAsReadArgs,
  IMutationSendMessageArgs,
  IQuery,
  IQueryFetchMessagesArgs,
} from '../../../../commons/types/generated/types';
import ChatRoomUI from './ChatRoom.presenter';
import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  MARK_MESSAGES_AS_READ,
} from './ChatRoom.queries';

// 0. 채팅읽음 API 넣기, 상대가 안읽은 채팅 표시 (프론트)
// 1. 나가기 버튼추가 및 나가기 API 넣기
// 2. 중립 채팅(공지 채팅) API 넣기 (나갈때 말고 어떨때 넣을지 생각해보기)
// 3. 상대가 나갔을때 채팅 막고, 혼자 남았을때 나가기시 진짜 나가냐고 채팅방 내용 지워진다고 경고 띄우기
// 3.5. 둘 다 나가면 채팅방 지워지도록 하기(나가기 API 수정)
// 4. 채팅방에서 한사람이 나갔을때, 다시 같은 채팅방에 입장할경우 생각해보기
// 5. BoardDetail 페이지 수정 (+거래 완료 상태면 채팅버튼 없애고)

// WebSocket 서버 URL
const WS_URL = 'ws://localhost:4000';

export default function ChatRoom() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(''); // 메시지 상태 관리
  const [myId, setMyId] = useState<number | null>(null);
  const [otherUserName, setOtherUserName] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket 객체 상태 관리
  const { otherName } = router.query;
  const chatRoomId: number = Number(router.query.chatRoomId);

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

  const [markMessagesAsReadMutation] = useMutation<
    Pick<IMutation, 'markMessagesAsRead'>,
    IMutationMarkMessagesAsReadArgs
  >(MARK_MESSAGES_AS_READ);

  // 메시지 입력이 변경될 때 호출되는 함수
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onClickSendMessage = async () => {
    if (message.trim() === '') {
      Modal.error({ content: '메시지를 입력하세요' });
      return;
    }

    try {
      await sendMessageMutation({
        variables: {
          chatRoomId,
          message,
          accessToken,
        },
      });

      // WebSocket을 통해 실시간 메시지 전송 알림
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            chatRoomId,
            senderId: myId,
          }),
        );
      }
      // 어차피 채팅을 송신한 쪽도 전송 알림을 받아 리패치한다.
      // refetch({ accessToken, chatRoomId: Number(router.query.chatRoomId) });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }

    setMessage('');
  };

  // 채팅방 입장 시 메시지를 읽음으로 표시
  useEffect(() => {
    if (accessToken && chatRoomId) {
      markMessagesAsReadMutation({
        variables: {
          accessToken,
          chatRoomId,
        },
      }).catch((error) => {
        Modal.error({ content: `메시지 읽음 처리 오류: ${error.message}` });
      });
    }
  }, [accessToken, chatRoomId]);

  // localStorage에서 Access Token 과 userData 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('userData');

      if (!token || !userData) {
        Modal.error({ content: '유저 정보 로딩 오류 발생' });
        router.push('/auth/login');
        return;
      }

      setAccessToken(token);
      setMyId(Number(JSON.parse(userData).id));
    }
  }, [router]);

  useEffect(() => {
    if (accessToken) {
      const socket = new WebSocket(WS_URL);

      // socket.onopen = () => {
      //   console.log('소켓 연결 성공');
      // };

      socket.onmessage = async (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          console.log('메시지 수신:', receivedMessage);

          if (chatRoomId) {
            await refetch({
              accessToken,
              chatRoomId,
            });

            await markMessagesAsReadMutation({
              variables: {
                accessToken,
                chatRoomId,
              },
            });
          } else {
            Modal.error({ content: '채팅방 ID를 찾을 수 없습니다.' });
          }
        } catch (error) {
          Modal.error({ content: `오류: ${error.message}` });
        }
      };

      socket.onerror = (error) => {
        Modal.error({ content: `소켓 오류: ${error}` });
      };

      socket.onclose = () => {
        console.log('소켓 연결 종료');
        setWs(null);
      };

      setWs(socket);

      return () => {
        console.log('소켓 연결 정리중');
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
