import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  IMutation,
  IMutationLeaveChatRoomArgs,
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
  LEAVE_CHAT_ROOM,
} from './ChatRoom.queries';

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

  const [leaveChatRoomMutation] = useMutation<
    Pick<IMutation, 'leaveChatRoom'>,
    IMutationLeaveChatRoomArgs
  >(LEAVE_CHAT_ROOM);

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
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }

    setMessage('');
  };

  const onClickLeaveButton = () => {
    Modal.confirm({
      title: '채팅방 나가기',
      content: '정말로 채팅방을 나가시겠습니까?',
      okText: '예',
      cancelText: '아니오',
      onOk: async () => {
        try {
          await leaveChatRoomMutation({
            variables: {
              chatRoomId,
              accessToken,
            },
          });
          router.push('/chat/chatRoomList');
        } catch (error) {
          Modal.error({ content: `채팅방 나가기 오류: ${error.message}` });
        }
      },
    });
  };

  /** 메시지를 읽음으로 표시 */
  const handleMessageRead = async () => {
    if (accessToken && chatRoomId) {
      try {
        await markMessagesAsReadMutation({
          variables: {
            accessToken,
            chatRoomId,
          },
        });
        //
      } catch (error) {
        Modal.error({ content: `메시지 읽음 처리 오류: ${error.message}` });
      }
    }
  };

  // 페이지 로드시 localStorage에서 유저 정보 가져오기
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

  // WebSocket 연결 및 설정
  useEffect(() => {
    // 컴포넌트가 마운트 상태인지 확인
    let isMounted = true;

    if (accessToken) {
      const socket = new WebSocket(WS_URL);

      // 웹 소켓이 연결되었을때
      socket.onopen = () => {
        if (isMounted) {
          console.log('WebSocket 연결 완료');
          setWs(socket);
          socket.send(
            JSON.stringify({
              type: 'messageReadOnEnter',
              chatRoomId,
              senderId: myId,
            }),
          );
        }
      };

      socket.onmessage = async (event) => {
        if (!isMounted) return;

        try {
          const receivedMessage = JSON.parse(event.data);
          console.log('메시지 수신:', receivedMessage);

          if (chatRoomId) {
            // 상대방이 채팅방에 입장해 있는 경우 읽음 처리
            if (receivedMessage.senderId !== myId) {
              await handleMessageRead();
            }

            await refetch({
              accessToken,
              chatRoomId,
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
        if (isMounted) {
          console.log('소켓 연결 종료');
          setWs(null);
        }
      };

      return () => {
        isMounted = false;
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
      onClickLeaveButton={onClickLeaveButton}
      myId={myId}
      message={message}
      otherUserName={otherUserName}
    />
  );
}
