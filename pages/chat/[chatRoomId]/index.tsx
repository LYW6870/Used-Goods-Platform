import { useAuth } from '../../../src/components/commons/hooks/customs/useAuth';
import ChatRoom from '../../../src/components/units/chat/chatRoom/ChatRoom.container';

export default function ChatRoomPage() {
  useAuth();

  return (
    <>
      <ChatRoom />
    </>
  );
}
