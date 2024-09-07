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
  FETCH_CHAT_ROOM,
} from './ChatRoom.queries';

// 1. BoardDetail 페이지 수정 (+거래 완료 상태면 채팅버튼 없애고)
// ㄴ 채팅방에서 한사람이 나갔을때, 다시 같은 채팅방에 입장할경우 생각해보기

// WebSocket 서버 URL
const WS_URL = 'ws://localhost:4000';

export default function ChatRoom() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(''); // 메시지 상태 관리
  const [myId, setMyId] = useState<number | null>(null);
  const [isChatDisabled, setIsChatDisabled] = useState<boolean>(false);
  const [otherUserName, setOtherUserName] = useState<string>('');
  const [myName, setMyName] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket 객체 상태 관리
  const chatRoomId: number = Number(router.query.chatRoomId);

  const { data: chatMessagesData, refetch } = useQuery<
    Pick<IQuery, 'fetchMessages'>,
    IQueryFetchMessagesArgs
  >(FETCH_MESSAGES, {
    variables: {
      accessToken,
      chatRoomId,
    },
    skip: !accessToken || !chatRoomId,
  });

  useQuery(FETCH_CHAT_ROOM, {
    variables: {
      accessToken,
      chatRoomId,
    },
    skip: !accessToken || !chatRoomId,
    onCompleted: (data) => {
      if (!myId || !data) return;

      // 나의 Type에 따라 상대방과 나를 구분
      const isBuyer = myId === data.fetchChatRoom.buyer.id;

      // 상대방의 Left 상태 저장
      const isOtherUserLeft = isBuyer
        ? data.fetchChatRoom.sellerLeft
        : data.fetchChatRoom.buyerLeft;

      setIsChatDisabled(isOtherUserLeft);

      // 각 사용자의 이름 설정
      setMyName(
        isBuyer
          ? data.fetchChatRoom.buyer.name
          : data.fetchChatRoom.seller.name,
      );
      setOtherUserName(
        isBuyer
          ? data.fetchChatRoom.seller.name
          : data.fetchChatRoom.buyer.name,
      );
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
    if (message.trim() === '' || isChatDisabled) {
      Modal.error({ content: '메시지를 입력하세요' });
      return;
    }

    try {
      await sendMessageMutation({
        variables: {
          chatRoomId,
          message,
          accessToken,
          isNotice: false,
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

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isChatDisabled) {
      onClickSendMessage();
    }
  };

  const onClickLeaveButton = () => {
    Modal.confirm({
      title: '채팅방 나가기',
      content: '정말로 채팅방을 나가시겠습니까?',
      okText: '예',
      cancelText: '아니오',
      onOk: async () => {
        try {
          // 채팅방 나갔다는 공지 메시지 전송
          await sendMessageMutation({
            variables: {
              chatRoomId,
              message: `${myName}님이 채팅방에서 나갔습니다.`,
              accessToken,
              isNotice: true,
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

          // 채팅방 나감 알림
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
    if (accessToken) {
      // 컴포넌트가 마운트 상태인지 확인
      let isMounted = true;
      const socket = new WebSocket(WS_URL);

      // 웹 소켓이 연결되었을때
      socket.onopen = () => {
        if (isMounted) {
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
        // console.log('receivedMessage', event.data);

        try {
          const receivedMessage = JSON.parse(event.data);
          // console.log('chatRoomId 상태: ', chatRoomId);

          if (chatRoomId) {
            // 상대방이 채팅방에 입장해 있는 경우 읽음 처리
            if (receivedMessage.senderId !== myId) {
              // console.log('상대방 입장해있음 확인!');
              await handleMessageRead();
            }

            await refetch({
              accessToken,
              chatRoomId,
            });
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
          setWs(null);
        }
      };

      return () => {
        isMounted = false;
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

  return (
    <ChatRoomUI
      chatMessagesData={chatMessagesData}
      onChangeMessage={onChangeMessage}
      onClickSendMessage={onClickSendMessage}
      onClickLeaveButton={onClickLeaveButton}
      myId={myId}
      message={message}
      otherUserName={otherUserName}
      isChatDisabled={isChatDisabled}
      handleEnterPress={handleEnterPress}
    />
  );
}
