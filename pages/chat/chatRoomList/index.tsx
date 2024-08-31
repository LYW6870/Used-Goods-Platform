import { useAuth } from '../../../src/components/commons/hooks/customs/useAuth';
import ChatRoomList from '../../../src/components/units/chat/chatRoomList/ChatRoomList.container';

export default function ChatRoomListPage() {
  useAuth();

  return (
    <>
      <ChatRoomList />
    </>
  );
}
